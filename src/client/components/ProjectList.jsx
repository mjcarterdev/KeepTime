import { AnimatePresence } from 'framer-motion';
import ProjectItem from './ProjectItem';
import { useEffect, useState } from 'react';

const ProjectList = ({ data, setShowSubtaskBtns }) => {
  const [expanded, setExpanded] = useState(0);

  useEffect(() => {
    if (!expanded) {
      setShowSubtaskBtns(false);
    } else {
      setShowSubtaskBtns(true);
    }
  }, [expanded]);
  return (
    <div className="flex flex-col h-full max-w-sm gap-2 pt-8 overflow-y-auto scrollbar-hide list-fade">
      <AnimatePresence>
        {[...data].map((item) => {
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
  );
};

export default ProjectList;
