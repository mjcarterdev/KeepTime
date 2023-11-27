import { useQuery } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';
import { useRef, useState } from 'react';
import { getSubtaskById } from '../api/services';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

import DeleteSubtaskModal from '../components/modals/DeleteSubtaskModal';
import Icon from '../components/Icon';
import NavBar from '../components/Navbar';
import RoundButtonWithLabel from '../components/RoundButtonWithLabel';
import Spinner from '../components/Spinner';
import Timer from '../components/Timer';
import TimeEntries from '../components/TimeEntries';
import Toolbar from '../components/Toolbar';

const SubtaskPage = () => {
  const { user } = useContext(AuthContext);
  const loader = useLoaderData();
  const subtaskId = loader.subtaskId;
  const timerRef = useRef();

  const [isTimerRunning, setTimerRunning] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: [`subtask`, subtaskId],
    queryFn: ({ queryKey }) => getSubtaskById(queryKey[1]),
  });

  useEffect(() => {
    if (user == '') {
      navigate('/');
    }
  }, [user]);

  const handleTimerStart = () => {
    timerRef.current.start();
    setTimerRunning(true);
  };

  const handleTimerStop = () => {
    timerRef.current.stop();
    setTimerRunning(false);
  };

  const handleTimerRestart = () => {
    timerRef.current.reset();
    setTimerRunning(true);
  };

  const handleTimerCancel = () => {
    timerRef.current.cancel();
    setTimerRunning(false);
  };

  return (
    <>
      <NavBar location={data?.data.title} />
      <div
        className={`flex pb-32 pt-24 flex-col flex-1 h-[100vh] w-full gap-2 p-4 overflow-y-scroll md:items-center scrollbar-hide md:scrollbar-default `}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div>title: {data?.data.title}</div>
            <div>description: {data?.data.description}</div>
            <Timer
              ref={timerRef}
              subtaskId={data?.data.id}
              projectId={data?.data.projectId}
            ></Timer>
            <TimeEntries
              subtaskId={data?.data.id}
              totalDuration={data?.data.totalDuration}
              isEditMode={false}
            ></TimeEntries>
          </>
        )}
      </div>
      <Toolbar>
        {isTimerRunning ? (
          <>
            <RoundButtonWithLabel
              label={'Restart'}
              onClick={() => {
                handleTimerRestart();
              }}
            >
              <Icon iconName={'restart'} className={'text-accent-content'} />
            </RoundButtonWithLabel>
            <RoundButtonWithLabel
              label={'Cancel'}
              onClick={() => {
                handleTimerCancel();
              }}
            >
              <Icon iconName={'cross'} className={'text-accent-content'} />
            </RoundButtonWithLabel>
            <RoundButtonWithLabel
              label={'Stop'}
              onClick={() => {
                handleTimerStop();
              }}
            >
              <Icon iconName={'stop'} className={'text-accent-content'} />
            </RoundButtonWithLabel>
          </>
        ) : (
          <>
            <RoundButtonWithLabel
              label={'Delete Subtask'}
              onClick={() => {
                document.getElementById('delete_subtask').showModal();
              }}
            >
              <Icon iconName={'delete'} className={'text-accent-content'} />
            </RoundButtonWithLabel>
            <RoundButtonWithLabel
              label={'Start Timer'}
              onClick={() => {
                handleTimerStart();
              }}
            >
              <Icon iconName={'play'} className={'text-accent-content'} />
            </RoundButtonWithLabel>
          </>
        )}
      </Toolbar>

      <DeleteSubtaskModal subtaskId={subtaskId} />
    </>
  );
};

export default SubtaskPage;
