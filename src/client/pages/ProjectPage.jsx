import Button from '../components/Button';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import Toolbar from '../components/Toolbar';
import ProjectItem from '../components/ProjectItem';
import { AnimatePresence } from 'framer-motion';

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

      <div className="flex flex-col flex-1 w-full gap-2 p-4 overflow-y-scroll md:overflow-visible md:flex-wrap md:max-w-max70 scrollbar-hide md:scrollbar-default md:flex-row">
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
          className={'w-20 rounded-full'}
          onClick={() => {
            console.log('button clicked');
          }}
        >
          Add Project
        </Button>
      </Toolbar>
    </>
  );
};

export default ProjectPage;
