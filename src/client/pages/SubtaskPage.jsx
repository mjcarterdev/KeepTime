import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';
import { useRef, useState } from 'react';
import { getSubtaskById, updateSubtaskById } from '../api/services';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import AddTimeModal from '../components/modals/AddTimeModal';
import DeleteSubtaskModal from '../components/modals/DeleteSubtaskModal';
import EditableText from '../components/EditableTextBox';
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
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isTimerRunning, setTimerRunning] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: [`subtask`, subtaskId],
    queryFn: ({ queryKey }) => getSubtaskById(queryKey[1]),
  });

  const completeSubtaskMutation = useMutation({
    mutationFn: updateSubtaskById,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subtask'] });
      let message = data?.data.completed
        ? 'Subtask restored.'
        : 'Subtask completed.';
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        toastId: 'completeProjectSuccess',
        className: 'notification',
      });
    },
  });

  const updateSubtaskMutation = useMutation({
    mutationFn: updateSubtaskById,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subtask'] });
    },
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

  const handleCompleteSubtask = (isComplete) => {
    completeSubtaskMutation.mutate({
      id: subtaskId,
      completed: isComplete,
    });
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
            <div className="flex items-center">
              <EditableText
                initialText={data?.data.title}
                updateSubtaskFn={updateSubtaskMutation}
                className={' p-2 min-w-min70 text-secondary font-medium'}
                showEdit={isEdit}
                showEditFn={setIsEdit}
                item={data?.data}
                isProject={false}
                isTitle={true}
              />

              <div
                onClick={(event) => {
                  setIsEdit(!isEdit);
                }}
                className={'cursor-pointer '}
              >
                <Icon iconName={'edit-sm'} className={'text-[0.5rem]'} />
              </div>
            </div>
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
              label={
                data?.data.completed ? 'Restore Subtask' : 'Complete Subtask'
              }
              onClick={() => {
                handleCompleteSubtask(!data?.data.completed);
              }}
            >
              <Icon iconName={'check'} className={'text-accent-content'} />
            </RoundButtonWithLabel>
            <RoundButtonWithLabel
              label={'Delete Subtask'}
              onClick={() => {
                document.getElementById('delete_subtask').showModal();
              }}
            >
              <Icon iconName={'delete'} className={'text-accent-content'} />
            </RoundButtonWithLabel>
            {data?.data.completed ? null : (
              <>
                <RoundButtonWithLabel
                  disabled={data?.data.completed}
                  label={'Start Timer'}
                  onClick={() => {
                    handleTimerStart();
                  }}
                >
                  <Icon iconName={'play'} className={'text-accent-content'} />
                </RoundButtonWithLabel>
                <RoundButtonWithLabel
                  disabled={data?.data.completed}
                  label={'Add Time'}
                  onClick={() => {
                    document.getElementById('add_time').showModal();
                  }}
                >
                  <Icon iconName={'add'} className={'text-accent-content'} />
                </RoundButtonWithLabel>
              </>
            )}
          </>
        )}
      </Toolbar>
      <ToastContainer hideProgressBar limit={3} />
      <DeleteSubtaskModal subtaskId={subtaskId} />
      <AddTimeModal projectId={data?.data.projectId} subtaskId={subtaskId} />
    </>
  );
};

export default SubtaskPage;
