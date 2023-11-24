import Button from '../components/Button';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect, useContext } from 'react';
import Toolbar from '../components/Toolbar';
import ProjectItem from '../components/ProjectItem';
import { AnimatePresence } from 'framer-motion';
import {
  getAllProjects,
  postProject,
  updateProjectById,
  postSubtask,
  updateSubtaskById,
  deleteProject,
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

const ProjectPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getAllProjects,
  });

  const expanded = useProjectStore((state) => state.expanded);
  const setExpanded = useProjectStore((state) => state.setExpanded);
  const [workingData, setWorkingData] = useState([]);
  const isProjectsEmpty = workingData?.length > 0;

  useEffect(() => {
    if (user === null) {
      navigate('/');
    }
  }, [user]);

  useEffect(() => {
    setWorkingData(data?.data.sort(compareTitle));
  }, [data?.data]);

  // Query Functions

  const deleteProjectMutation = useMutation({
    mutationFn: deleteProject,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setExpanded(false);
    },
  });

  const addProjectMutation = useMutation({
    mutationFn: postProject,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: updateProjectById,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      setExpanded(data.data);
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const addSubtaskMutation = useMutation({
    mutationFn: postSubtask,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const updateSubtaskNameMutation = useMutation({
    mutationFn: updateSubtaskById,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  // handlers

  const handleAddProject = () => {
    addProjectMutation.mutate({ title: 'new project' });
  };

  const handleAddSubtask = () => {
    addSubtaskMutation.mutate({ title: 'new subtask', projectId: expanded.id });
  };

  const handleCompleteProject = () => {
    updateProjectMutation.mutate({
      projectId: expanded.id,
      title: expanded.title,
      completed: !expanded.completed,
    });
  };

  return (
    <>
      <NavBar location="Projects" />

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
                    addProject={addProjectMutation}
                    updateProject={updateProjectMutation}
                    addSubtask={addSubtaskMutation}
                    updateSubtask={updateSubtaskNameMutation}
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
                expanded.completed ? 'Restore Project' : 'Complete Project'
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
                console.log(expanded.id);
                deleteProjectMutation.mutate(expanded.id);
              }}
            >
              <Icon iconName={'delete'} className={'text-accent-content'} />
            </RoundButtonWithLabel>

            <RoundButtonWithLabel
              label={'Add Subtask'}
              onClick={() => {
                handleAddSubtask();
              }}
            >
              <Icon iconName={'add'} className={'text-accent-content'} />
            </RoundButtonWithLabel>
          </>
        ) : (
          <Button onClick={() => handleAddProject()}>Add Project</Button>
        )}
      </Toolbar>
    </>
  );
};

export default ProjectPage;
