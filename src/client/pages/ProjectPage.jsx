import Button from '../components/Button';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import Toolbar from '../components/Toolbar';
import ProjectItem from '../components/ProjectItem';
import { AnimatePresence } from 'framer-motion';
import PageTitle from '../components/PageTitle';
import NavBar from '../components/Navbar';

const ProjectPage = ({ useRouteContext }) => {
  const { queryGetAllProjectsOptions, authContext } = useRouteContext();
  const { data } = useQuery(queryGetAllProjectsOptions);
  const [showSubtaskBtns, setShowSubtaskBtns] = useState(false);
  const [expanded, setExpanded] = useState(0);

  useEffect(() => {
    if (!expanded) {
      setShowSubtaskBtns(false);
    } else {
      setShowSubtaskBtns(true);
    }
  }, [expanded]);

  return (
    <>
      <NavBar authContext={authContext} />
      <div className="flex flex-col items-center justify-between md:justify-start bg-gradient-to-tl from-base-200 to-base-100 h-[calc(100vh-4rem)]">
        <PageTitle title={'Projects'} className={'md:pb-8'} />
        <div className="flex flex-col w-full gap-2 p-4 pb-32 overflow-y-scroll md:overflow-visible md:flex-wrap md:max-w-max70 add-border scrollbar-hide md:scrollbar-default md:flex-row">
          <AnimatePresence initial={false}>
            {[...data.data].map((item) => {
              return (
                <ProjectItem
                  key={item.id}
                  item={item}
                  expanded={expanded}
                  setExpanded={setExpanded}
                />
              );
            })}
          </AnimatePresence>
        </div>
        <Toolbar>
          <Button
            className={'w-44 rounded-full'}
            onClick={() => {
              console.log('button clicked');
            }}
          >
            Add Project
          </Button>
        </Toolbar>
      </div>
    </>
  );
};

export default ProjectPage;
