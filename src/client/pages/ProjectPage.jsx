// import { Link } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import PageTitle from '../components/PageTitle';
import { useQuery } from '@tanstack/react-query';

import ProjectList from '../components/ProjectList';

const ProjectPage = ({ useRouteContext }) => {
  const { queryGetAllProjectsOptions } = useRouteContext();
  const { data } = useQuery(queryGetAllProjectsOptions);

  return (
    <div
      className="h-[calc(100vh-4rem)] bg-base-100 flex flex-col items-center 
    gap-2 justify-start p-2 scrollbar-hide"
    >
      <PageTitle title={'Project Page'} />
      <ProjectList data={data.data} />
    </div>
  );
};

export default ProjectPage;
