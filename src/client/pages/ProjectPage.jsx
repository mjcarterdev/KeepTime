import Button from '../components/Button';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import Toolbar from '../components/Toolbar';
import ProjectItem from '../components/ProjectItem';
import { AnimatePresence } from 'framer-motion';
import {
  postProject,
  updateProjectById,
  postSubtask,
  updateSubtaskById,
  deleteProject,
} from '../api/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import NavBar from '../components/Navbar';
import Icon from '../components/Icon';
import RoundButtonWithLabel from '../components/IconButton';
import { compareTitle } from '../utils/sort-alphabetically';
import useProjectStore from '../context/projectStore.jsx';

const ProjectPage = ({ useRouteContext }) => {
  const queryClient = useQueryClient();
  const { queryGetAllProjectsOptions, authContext } = useRouteContext();
  const { data } = useQuery(queryGetAllProjectsOptions);
  const expanded = useProjectStore((state) => state.expanded);
  const setExpanded = useProjectStore((state) => state.setExpanded);
  const [workingData, setWorkingData] = useState([]);

  useEffect(() => {
    setWorkingData(data.data.sort(compareTitle));
  }, [data.data]);

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

  const updateProjectNameMutation = useMutation({
    mutationFn: updateProjectById,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
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

  return (
    <>
      <NavBar authContext={authContext} location="Projects" />

      <div
        className={`flex pb-32 pt-24 flex-col flex-1 h-[100vh] w-full gap-2 p-4 overflow-y-scroll md:items-center scrollbar-hide md:scrollbar-default `}
      >
        <AnimatePresence initial={true}>
          {[...workingData].map((item) => {
            return (
              <ProjectItem
                key={item.id}
                item={item}
                expanded={expanded}
                setExpanded={setExpanded}
                addProject={addProjectMutation}
                updateProject={updateProjectNameMutation}
                addSubtask={addSubtaskMutation}
                updateSubtask={updateSubtaskNameMutation}
              />
            );
          })}
        </AnimatePresence>
      </div>
      <Toolbar>
        {expanded ? (
          <>
            <RoundButtonWithLabel
              label={'Complete'}
              onClick={() => {
                console.log('project completed');
              }}
            >
              <Icon iconName={'check'} className={'text-accent-content'} />
            </RoundButtonWithLabel>
            <RoundButtonWithLabel
              label={'Delete'}
              onClick={() => {
                console.log(expanded.id);
                deleteProjectMutation.mutate(expanded.id);
              }}
            >
              <Icon iconName={'delete'} className={'text-accent-content'} />
            </RoundButtonWithLabel>

            <RoundButtonWithLabel
              label={'Add'}
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
