import { motion, AnimatePresence } from 'framer-motion';

export const ProjectItem = ({ item, expanded, setExpanded }) => {
  const isOpen = item === expanded;
  return (
    <div>
      <motion.header
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.7 }}
        transition={{ duration: 1 }}
        onClick={() => setExpanded(isOpen ? false : item)}
        value={item}
        className={`z-10 items-center justify-center min-w-full pt-2 pl-2 
        text-xl border border-gray-600 border-solid cursor-pointer 
        min-h-16 space-between w-96 bg-primary-blue-50 card ${
          isOpen && 'bg-red-300'
        }`}
      >
        {item.title}
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
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
