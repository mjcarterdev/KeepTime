import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { getAllTimeRecordsBySubtaskId } from '../api/services';
import Spinner from '../components/Spinner.jsx';

const TimeEntries = ({ subtaskId, totalDuration, isEditMode }) => {
  const [timeRecordsList, setTimeRecordsList] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: [`timeRecords`, subtaskId],
    queryFn: ({ queryKey }) => getAllTimeRecordsBySubtaskId(queryKey[1]),
  });

  useEffect(() => {
    let list = data?.data ? modifyTimeRecords(data?.data) : [];
    setTimeRecordsList(list);
  }, [data?.data]);

  const modifyTimeRecords = (data) => {
    let list = data.map((timeRecord) => {
      timeRecord.startTime = new Intl.DateTimeFormat('fr-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(new Date(timeRecord.startTime));
      return timeRecord;
    });

    return list.sort((a, b) => a.createdAt - b.createdAt);
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
              <span>{totalDuration}</span>
            </div>
            <section className="overflow-y-auto divide-y-2 divide-accent divide-opacity-20">
              {timeRecordsList && timeRecordsList.length > 0 ? (
                [...timeRecordsList].map((item) => (
                  <div
                    key={item.id}
                    item={item}
                    className="flex items-center justify-between w-full px-4 text-center bg-transparent min-h-12 hover:bg-accent hover:bg-opacity-30"
                  >
                    {isEditMode ? (
                      <input
                        type="date"
                        className=""
                        defaultValue={item.startTime}
                      />
                    ) : (
                      <div className="text-secondary ">{item.startTime}</div>
                    )}
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
};

export default TimeEntries;
