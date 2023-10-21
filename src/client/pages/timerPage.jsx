
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';

import MainButtonSVG from '../images/mainButton.svg';
import ResetSVG from '../images/reset.svg';

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
    <div className="flex flex-col items-center justify-center h-screen">

        <div className="absolute text-2xl font-bold text-gray-900 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            {formatTime(time)}
        </div>

        <img src={MainButtonSVG} alt="Main Button"/>

        <button
            onClick={resetTimer}
            className="absolute mt-4 transform -translate-x-1/2 translate-y-1/2 top-1/2 left-1/2"
        >
            <img src={ResetSVG} alt="Reset"/>
        </button>

        <button 
            onClick={toggleTimer}
            className="px-10 py-2 text-white transition bg-blue-500 rounded-full shadow-btn hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            style={{ boxShadow: '0px 4px 5px 0px #90B4FD inset, 0px 4px 5px 0px rgba(59, 45, 211, 0.25), 0px -4px 10px 0px #414EEC inset' }}
        >
            {running ? "STOP" : "START"}
        </button>

    </div>
  );
  
};

export default Timer;