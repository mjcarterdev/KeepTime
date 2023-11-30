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
import EditableTextArea from '../components/EditableTextArea';
import Icon from '../components/Icon';
import NavBar from '../components/Navbar';
import RoundButtonWithLabel from '../components/RoundButtonWithLabel';
import Spinner from '../components/Spinner';
import Timer from '../components/Timer';
import TimeEntries from '../components/TimeEntries';
import Toolbar from '../components/Toolbar';
import UpdateTimeModal from '../components/modals/UpdateTimeModal';
import Card from '../components/Card';

const SubtaskPage = () => {
  const { user } = useContext(AuthContext);
  const loader = useLoaderData();
  const subtaskId = loader.subtaskId;
  const timerRef = useRef();
  const timeListRef = useRef(null);
  const timeDeleteRef = useRef();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isTimerRunning, setTimerRunning] = useState(false);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [isEditDescription, setIsEditDescription] = useState(false);
  const [selectedTimeEntry, setSelectedTimeEntry] = useState(null);
  const [showAddTime, setShowAddTime] = useState(false);
  const [showDeleteSubtask, setShowDeleteSubtask] = useState(false);

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

  const handleDeleteTime = () => {
    timerRef.current.deleteById(selectedTimeEntry.id);
    setSelectedTimeEntry(null);
  };

  const handleCompleteSubtask = (isComplete) => {
    completeSubtaskMutation.mutate({
      id: subtaskId,
      completed: isComplete,
    });
  };

  // Assign value reseived from TimeEntries component
  const handleSelectedTimeEntry = (value) => {
    setSelectedTimeEntry(value);
  };

  const handleDeselectTimeEntry = () => {
    timeListRef.current.selectTimeEntry(null);
  };

  return (
    <>
      <NavBar location={'Subtask'} />
      <div
        className={`flex pb-32 pt-24 flex-col flex-1 h-[100vh] w-full gap-2 p-4 overflow-y-scroll md:items-center scrollbar-hide md:scrollbar-default `}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="flex items-center w-full md:max-w-[32rem]">
              {data?.data.completed ? (
                <span className="pl-4">
                  <Icon iconName={'check-big'} />
                </span>
              ) : (
                <span className="w-2"></span>
              )}
              <div className="w-full underline underline-offset-2 decoration-accent">
                <div className="flex items-center justify-between w-full cursor-default">
                  <EditableText
                    initialText={data?.data.title}
                    updateSubtaskFn={updateSubtaskMutation}
                    className={
                      ' p-2 min-w-min70 text-secondary font-medium text-3xl border-accent'
                    }
                    showEdit={isEditTitle}
                    showEditFn={setIsEditTitle}
                    item={data?.data}
                    isProject={false}
                    isTitle={true}
                  />

                  <div
                    onClick={(event) => {
                      setIsEditTitle(!isEditTitle);
                    }}
                    className={'cursor-pointer pr-4'}
                  >
                    <Icon iconName={'edit-sm'} className={'text-[0.5rem]'} />
                  </div>
                </div>
              </div>
            </div>

            <Card>
              <div className="flex items-center justify-between pb-2">
                <span className="px-4 text-xl font-medium cursor-default">
                  Description
                </span>
                <div
                  onClick={(event) => {
                    setIsEditDescription(!isEditDescription);
                  }}
                  className={'cursor-pointer px-4'}
                >
                  <Icon iconName={'edit-sm'} className={'text-[0.5rem]'} />
                </div>
              </div>
              <span className="w-full border-b-2 border-accent"></span>
              <div className="flex items-center px-2">
                <EditableTextArea
                  initialText={data?.data.description}
                  updateSubtaskFn={updateSubtaskMutation}
                  className={' p-2 text-secondary w-full'}
                  showEdit={isEditDescription}
                  showEditFn={setIsEditDescription}
                  item={data?.data}
                />
              </div>
            </Card>

            <Timer
              ref={timerRef}
              subtaskId={data?.data.id}
              projectId={data?.data.projectId}
            ></Timer>
            <TimeEntries
              ref={timeListRef}
              subtaskId={data?.data.id}
              totalDuration={data?.data.totalDuration}
              selectedEntry={handleSelectedTimeEntry}
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
        ) : selectedTimeEntry ? (
          <>
            <RoundButtonWithLabel
              label={'Cancel'}
              onClick={() => {
                handleDeselectTimeEntry();
              }}
            >
              <Icon iconName={'cross'} className={'text-accent-content'} />
            </RoundButtonWithLabel>
            <RoundButtonWithLabel
              ref={timeDeleteRef}
              label={'Delete Time'}
              onClick={() => {
                handleDeleteTime();
              }}
            >
              <Icon iconName={'delete'} className={'text-accent-content'} />
            </RoundButtonWithLabel>
            <RoundButtonWithLabel
              label={'Edit Time'}
              onClick={() => {
                document.getElementById('update_time_record').showModal();
              }}
            >
              <Icon iconName={'edit'} className={'text-accent-content'} />
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
                setShowDeleteSubtask(!showDeleteSubtask);
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
                    setShowAddTime(!showAddTime);
                  }}
                >
                  <Icon iconName={'add'} className={'text-accent-content'} />
                </RoundButtonWithLabel>
              </>
            )}
          </>
        )}
      </Toolbar>
      <ToastContainer hideProgressBar limit={3} autoClose={3000} />
      {showDeleteSubtask && (
        <DeleteSubtaskModal
          subtaskId={subtaskId}
          closeFn={setShowDeleteSubtask}
        />
      )}

      {showAddTime && (
        <AddTimeModal
          projectId={data?.data.projectId}
          subtaskId={subtaskId}
          closeFn={setShowAddTime}
        />
      )}

      {selectedTimeEntry ? (
        <UpdateTimeModal timeRecord={selectedTimeEntry} />
      ) : null}
    </>
  );
};

export default SubtaskPage;
