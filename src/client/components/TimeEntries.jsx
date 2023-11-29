import { useQuery } from '@tanstack/react-query';
import { useState, useEffect, forwardRef } from 'react';
import { getAllTimeRecordsBySubtaskId } from '../api/services';
import Spinner from '../components/Spinner.jsx';

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
      timeRecord.startTime = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(new Date(timeRecord.startTime));
      return timeRecord;
    });

    return list.sort(
      (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
    );
  };

  const calculateTotalDuration = (startTime, endTime) => {
    let totalMs = Date.parse(endTime) - Date.parse(startTime);

    let seconds = Math.floor(totalMs / 1000);
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

  const selectTimeEntry = (item) => {
    setSelectedTimeEntry(item);
    // Send selected entrry to subtask page to change Toolbar buttons
    props.selectedEntry(item);
  };

  return (
    <>
      <div className="flex flex-col py-2 h-80 md:w-[40rem] shadow-[2px_4px_5px_2px_#00000024] md:min-w-min50 md:h-50 rounded-[25px] bg-neutral bg-opacity-50 border border-gray-100 bg-clip-padding backdrop-filter backdrop-blur-lg">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="flex items-center font-medium justify-between w-full px-4 text-center bg-transparent min-h-12 border-2 border-transparent border-b-accent">
              <span>Time Entries: </span>
              <span>{props.totalDuration}</span>
            </div>
            <section className="overflow-y-auto divide-y-2 divide-accent divide-opacity-20">
              {timeRecordsList && timeRecordsList.length > 0 ? (
                [...timeRecordsList].map((item) => (
                  <div
                    key={item.id}
                    item={item}
                    className={`flex items-center justify-between cursor-pointer w-full px-4 text-center min-h-12 hover:bg-accent hover:bg-opacity-30 ${
                      selectedTimeEntry && selectedTimeEntry.id == item.id
                        ? 'bg-neutral bg-opacity-20 bg-purple-700'
                        : 'bg-transparent'
                    }`}
                    onClick={() => {
                      selectTimeEntry(item);
                    }}
                  >
                    <div className="text-secondary ">{item.startTime}</div>
                    <div className="text-secondary ">{item.totalDuration}</div>
                  </div>
                ))
              ) : (
                <div className="text-secondary px-4 py-10 min-h-12">
                  No time records found... Click Start to record the time for
                  the subtask.
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </>
  );
});

export default TimeEntries;
