import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { startTimer, stopTimer, deleteTimeRecordById } from '../api/services';

const Timer = forwardRef((props, ref) => {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [currentTimeRecordId, setCurrentTimeRecordId] = useState(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    let timerInterval;
    if (running) {
      timerInterval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [running]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0',
    )}:${String(seconds).padStart(2, '0')}`;
  };

  const addTimeRecordMutation = useMutation({
    mutationFn: stopTimer,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['timeRecords'] });
    },
  });

  useImperativeHandle(ref, () => ({
    async start() {
      setRunning(true);

      const data = {
        projectId: props.projectId,
        subtaskId: props.subtaskId,
      };

      let timer = await startTimer(data);
      setCurrentTimeRecordId(timer.id);
    },

    async stop() {
      setRunning(false);

      addTimeRecordMutation.mutate(currentTimeRecordId);
      setTime(0);
      setCurrentTimeRecordId(null);
    },

    async cancel() {
      setRunning(false);
      await deleteTimeRecordById(currentTimeRecordId);
      setTime(0);
      setCurrentTimeRecordId(null);
    },

    async reset() {
      setRunning(false);
      await deleteTimeRecordById(currentTimeRecordId);
      setTime(0);
      this.start();
    },
  }));

  return (
    <div className="flex flex-col items-center justify-center py-10 text-2xl font-bold text-gray-900">
      {formatTime(time)}
    </div>
  );
});

export default Timer;
