import { motion, AnimatePresence } from 'framer-motion';

export const ProjectItem = ({ item, expanded, setExpanded }) => {
  const isOpen = item === expanded;
  const isSubTasksEmpty = item.subTasks.length > 0 ? true : false;

  return (
    <div className="h-auto">
      <motion.header
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.7 }}
        transition={{ duration: 1 }}
        onClick={() => setExpanded(isOpen ? false : item)}
        value={item}
        className="flex items-center justify-start h-20 pl-4 rounded shadow-xl md:w-80 md:h-32 text-l md:text-2xl rounded-[25px] bg-primary bg-opacity-20"
      >
        <span className="z-20">{item.title}</span>
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && isSubTasksEmpty && (
          <motion.section
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 1, type: 'spring' }}
            className="flex flex-col items-center justify-center max-w-full gap-1 px-4 cursor-pointer "
          >
            {[...item.subTasks].map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-center min-w-full text-center bg-green-400 add-border max-w-9/10 min-h-12"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(`${item.title}`);
                  }}
                >
                  {item.title}
                </div>
              );
            })}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectItem;
