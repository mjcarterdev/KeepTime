import { useQuery } from '@tanstack/react-query';
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { getAllTimeRecordsBySubtaskId } from '../api/services';
import Spinner from '../components/Spinner.jsx';
import Card from './Card.jsx';

const TimeEntries = forwardRef((props, ref) => {
  const [timeRecordsList, setTimeRecordsList] = useState([]);
  const [selectedTimeEntry, setSelectedTimeEntry] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: [`timeRecords`, props.subtaskId],
    queryFn: ({ queryKey }) => getAllTimeRecordsBySubtaskId(queryKey[1]),
  });

  useEffect(() => {
    let list = data?.data ? modifyTimeRecords(data?.data) : [];
    setTimeRecordsList(list);
  }, [data?.data]);

  const modifyTimeRecords = (data) => {
    let list = data.map((timeRecord) => {
      timeRecord.totalDuration = timeRecord.endTime
        ? calculateTotalDuration(timeRecord.startTime, timeRecord.endTime)
        : 'In progress';
      timeRecord.startTimeFormatted = new Intl.DateTimeFormat('en-GB').format(
        new Date(timeRecord.startTime),
      );
      return timeRecord;
    });

    return list.sort(
      (a, b) => Date.parse(b.startTime) - Date.parse(a.startTime),
    );
  };

  const calculateTotalDuration = (startTime, endTime) => {
    let totalMs = Date.parse(endTime) - Date.parse(startTime);

    let seconds = Math.round(totalMs / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    return (
      hours.toString().padStart(2, '0') +
      ':' +
      minutes.toString().padStart(2, '0') +
      ':' +
      seconds.toString().padStart(2, '0')
    );
  };

  useImperativeHandle(ref, () => ({
    selectTimeEntry,
  }));

  const selectTimeEntry = (item) => {
    setSelectedTimeEntry(item);
    // Send selected entrry to subtask page to change Toolbar buttons
    props.selectedEntry(item);
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Card>
          <div className="flex justify-between w-full pb-2 border-b-2 border-accent">
            <span className="pl-4 text-xl font-medium cursor-default">
              Time Entries:{' '}
            </span>
            <span className="pr-4 text-xl font-medium cursor-default">
              {props.totalDuration}
            </span>
          </div>
          {timeRecordsList && timeRecordsList.length > 0 ? (
            [...timeRecordsList].map((item) => (
              <div
                key={item.id}
                item={item}
                className={`flex items-center justify-between cursor-pointer w-full px-4 text-center min-h-12 hover:bg-accent hover:bg-opacity-30 border-b-2 border-accent border-opacity-20 ${
                  selectedTimeEntry && selectedTimeEntry.id == item.id
                    ? ' bg-opacity-20 bg-primary'
                    : 'bg-transparent'
                }`}
                onClick={() => {
                  selectTimeEntry(item);
                }}
              >
                <div className="text-secondary ">{item.startTimeFormatted}</div>
                <div className="text-secondary ">{item.totalDuration}</div>
              </div>
            ))
          ) : (
            <div className="px-4 py-10 text-secondary min-h-12">
              No time records found... Click Start to record the time for the
              subtask.
            </div>
          )}
        </Card>
      )}
    </>
  );
});

export default TimeEntries;
