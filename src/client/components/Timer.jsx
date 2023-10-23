import React, { useState, useEffect } from 'react';
import MainButtonSVG from '../images/mainButton.svg';

const Timer = () => {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);

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
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setRunning(!running);
  };

  const resetTimer = () => {
    setRunning(false);
    setTime(0);
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-2 ">
      <div className="absolute text-2xl font-bold text-gray-900 top-1/4">{formatTime(time)}</div>

      <img src={MainButtonSVG} alt="Main Button" className="max-w-full" />

      <button className="absolute z-10 w-16 h-16 btn btn-circle sm:w-22 sm:h-22 bg-primary text-primary-content hover:bg-primary-focus">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-refresh-ccw"
        >
          <polyline points="1 4 1 10 7 10"></polyline>
          <polyline points="23 20 23 14 17 14"></polyline>
          <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
        </svg>
      </button>

      <button onClick={toggleTimer} className="p-2 w-36 btn btn-primary">
        {running ? 'STOP' : 'START'}
      </button>
    </div>
  );
};

export default Timer;
