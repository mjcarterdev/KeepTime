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
        className="md:w-80 md:h-32 text-l md:text-2xl flex justify-start items-start pl-4 rounded-3xl shadow-xl group group-hover:before:duration-500 group-hover:after:duration-1000 after:duration-500 hover:border-sky-300  duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-2 hover:before:top-8 hover:before:right-16 hover:after:scale-150 hover:after:blur-none hover:before:-bottom-8 hover:before:blur-none hover:bg-sky-300 hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-sky-900 relative bg-sky-800 h-20 w-full border text-left p-3 text-gray-50  font-medium  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-sky-400 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-cyan-600 after:right-8 after:top-3 after:rounded-full after:blur"
        //className="add-border min-h-16"
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
