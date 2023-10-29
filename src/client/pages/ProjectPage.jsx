import PageTitle from '../components/PageTitle';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import ProjectList from '../components/ProjectList';
import Toolbar from '../components/Toolbar';

const ProjectPage = ({ useRouteContext }) => {
  const { queryGetAllProjectsOptions } = useRouteContext();
  const { data } = useQuery(queryGetAllProjectsOptions);
  const [showSubtaskBtns, setShowSubtaskBtns] = useState(false);

  return (
    <>
      <div
        className="h-[calc(100vh-4rem)] bg-base-100 flex flex-col items-center 
    gap-2 justify-start scrollbar-hide"
      >
        <PageTitle title={'Project Page'} />
        <ProjectList data={data.data} setShowSubtaskBtns={setShowSubtaskBtns} />
        <Toolbar>
          {showSubtaskBtns ? (
            <button className="w-40 btn badge-outline text-primary-content">
              Add Subtask
            </button>
          ) : (
            <button className="w-40 btn badge-outline text-primary-content">
              Add Project
            </button>
          )}
        </Toolbar>
      </div>
    </>
  );
};

export default ProjectPage;
