import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect, useContext } from 'react';
import Toolbar from '../components/Toolbar';
import ProjectItem from '../components/ProjectItem';
import { AnimatePresence } from 'framer-motion';
import {
  getAllProjects,
  postProject,
  updateProjectById,
  updateSubtaskById,
} from '../api/services';
import { useMutation } from '@tanstack/react-query';
import NavBar from '../components/Navbar';
import Icon from '../components/Icon';
import RoundButtonWithLabel from '../components/RoundButtonWithLabel.jsx';
import { compareTitle } from '../utils/sort-alphabetically';
import useProjectStore from '../context/projectStore.jsx';
import Spinner from '../components/Spinner.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteProjectModal from '../components/modals/DeleteProjectModal.jsx';
import AddSubtaskModal from '../components/modals/AddSubtaskModal.jsx';
import AddProjectModal from '../components/modals/AddProjectModal.jsx';

const ProjectPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (user == '') {
      navigate('/');
    }
  }, [user]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['projects'],
    queryFn: getAllProjects,
  });

  const expanded = useProjectStore((state) => state.expanded);
  const setExpanded = useProjectStore((state) => state.setExpanded);
  const [workingData, setWorkingData] = useState([]);
  const [filterProjects, setFilterProjects] = useState(false);
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [showAddSubtask, setShowAddSubtask] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const isProjectsEmpty = workingData?.length > 0;

  if (isError) {
    toast.error('project Error', {
      position: toast.POSITION.TOP_RIGHT,
      toastId: 'projectError',
      className: 'notification',
    });
  }

  useEffect(() => {
    let list;
    if (filterProjects) {
      list = data?.data.sort(compareTitle).filter((item) => item.completed);
    } else {
      list = data?.data.sort(compareTitle).filter((item) => !item.completed);
    }
    setWorkingData(list);
  }, [data?.data, filterProjects]);

  // Query Functions

  const updateProjectMutation = useMutation({
    mutationFn: updateProjectById,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      setExpanded(false);
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  // handlers

  const handleCompleteProject = () => {
    updateProjectMutation.mutate({
      projectId: expanded.id,
      title: expanded.title,
      completed: !expanded.completed,
    });
  };

  const handleToggleProjects = () => {
    setFilterProjects(!filterProjects);
  };

  return (
    <>
      <NavBar
        location={filterProjects ? 'Archived Projects' : 'Active Projects'}
      />
      {showDeleteModel && (
        <DeleteProjectModal
          projectId={expanded.id}
          closeFn={setShowDeleteModel}
          setExpanded={setExpanded}
        />
      )}
      {showAddSubtask && (
        <AddSubtaskModal
          projectId={expanded.id}
          closeFn={setShowAddSubtask}
          setExpanded={setExpanded}
        />
      )}
      {showAddProject && <AddProjectModal closeFn={setShowAddProject} />}
      <div
        className={`flex pb-32 pt-24 flex-col flex-1 h-[100dvh] w-full gap-2 p-4 overflow-y-scroll md:items-center scrollbar-hide md:scrollbar-default `}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <AnimatePresence initial={true}>
            {isProjectsEmpty ? (
              [...workingData].map((item) => {
                return (
                  <ProjectItem
                    key={item.id}
                    item={item}
                    expanded={expanded}
                    setExpanded={setExpanded}
                    updateProject={updateProjectMutation}
                  />
                );
              })
            ) : (
              <div className="h-8 p-2">No Projects...click below to add</div>
            )}
          </AnimatePresence>
        )}
      </div>

      <Toolbar>
        {expanded ? (
          <>
            <RoundButtonWithLabel
              label={
                expanded?.completed ? 'Restore Project' : 'Complete Project'
              }
              onClick={() => {
                handleCompleteProject();
              }}
            >
              <Icon
                iconName={expanded.completed ? 'restart' : 'check'}
                className={'text-accent-content'}
              />
            </RoundButtonWithLabel>
            <RoundButtonWithLabel
              label={'Delete Project'}
              onClick={() => {
                setShowDeleteModel(!showDeleteModel);
              }}
            >
              <Icon iconName={'delete'} className={'text-accent-content'} />
            </RoundButtonWithLabel>

            <RoundButtonWithLabel
              label={'Add Subtask'}
              onClick={() => {
                setShowAddSubtask(!showAddSubtask);
              }}
            >
              <Icon iconName={'add'} className={'text-accent-content'} />
            </RoundButtonWithLabel>
          </>
        ) : (
          <>
            <RoundButtonWithLabel
              label={filterProjects ? 'Archived Projects' : 'Active Projects'}
              onClick={() => {
                handleToggleProjects();
              }}
            >
              <Icon iconName={'list'} className={'text-accent-content'} />
            </RoundButtonWithLabel>
            <RoundButtonWithLabel
              label={'Add Project'}
              onClick={() => {
                setShowAddProject(!showAddProject);
              }}
            >
              <Icon iconName={'add'} className={'text-accent-content'} />
            </RoundButtonWithLabel>
          </>
        )}
      </Toolbar>

      <ToastContainer hideProgressBar limit={3} />
    </>
  );
};

export default ProjectPage;
