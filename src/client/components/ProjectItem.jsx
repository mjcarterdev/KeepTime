import { motion, AnimatePresence } from 'framer-motion';
import EditableText from './EditableTextBox';
import Icon from './Icon';
import useProjectStore from '../context/projectStore.jsx';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const ProjectItem = ({ item, updateProject, updateSubtask }) => {
  const expanded = useProjectStore((state) => state.expanded);
  const setExpanded = useProjectStore((state) => state.setExpanded);
  const isOpen = expanded.id === item.id;
  const isSubTasksEmpty = item.subTasks.length > 0 ? true : false;
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="h-auto">
      <motion.header
        transition={{ duration: 1 }}
        value={item}
        onClick={(event) => {
          event.nativeEvent.stopImmediatePropagation();
          if (isEdit && isOpen) {
            return;
          }
          isEdit ? '' : setExpanded(isOpen ? false : item);
        }}
        className={`text-secondary flex items-center justify-between px-4 h-20 pl-4 md:w-[40rem] shadow-[2px_4px_5px_2px_#00000024] md:min-w-min50 md:h-24 text-l md:text-2xl rounded-[25px] bg-neutral border border-gray-100 bg-opacity-20 hover:bg-accent hover:bg-opacity-30 ${
          isOpen ? 'rounded-bl-none rounded-br-none bg-purple-700' : 'rounded'
        }  `}
      >
        <div className="flex items-center">
          <EditableText
            initialText={item.title}
            updateProjectFn={updateProject}
            className={' p-2 min-w-min70 text-secondary font-medium'}
            showEdit={isEdit}
            showEditFn={setIsEdit}
            item={item}
            isProject={true}
          />

          <div
            onClick={(event) => {
              event.stopPropagation();
              setIsEdit(!isEdit);
            }}
            className={'cursor-pointer'}
          >
            <Icon iconName={'edit-sm'} className={'text-[0.5rem]'} />
          </div>
        </div>

        <div className="p-2">{item.totalDuration}</div>
      </motion.header>
      <AnimatePresence initial={true}>
        {isOpen && (
          <motion.section
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 1, type: 'spring' }}
            className="text-secondary flex flex-col items-center justify-center max-w-full gap-1 bg-neutral bg-opacity-50 border border-gray-100 divide-y-2 divide-accent divide-opacity-20 shadow-[2px_4px_5px_2px_#00000024] cursor-default divide-solid bg-clip-padding backdrop-filter backdrop-blur-lg "
          >
            {isSubTasksEmpty ? (
              [...item.subTasks].map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between w-full px-4 text-center bg-transparent text-secondary min-h-12 hover:bg-accent hover:bg-opacity-20"
                  >
                    <EditableText
                      initialText={item.title}
                      updateSubtaskFn={updateSubtask}
                      className={
                        'flex p-2 min-w-min70 text-secondary items-start'
                      }
                      showEdit={item.title === 'new subtask'}
                      showEditFn={setIsEdit}
                      item={item}
                      isProject={false}
                    />
                    <Link
                      key={item.id}
                      to={`/subtask/${item.id}`}
                      from={'/projects'}
                    >
                      <div className={'p-2'}>
                        <Icon iconName={'arrow-right'} />
                      </div>
                    </Link>
                  </div>
                );
              })
            ) : (
              <div className="h-8 p-2">
                No Subtasks found...click below to add task.
              </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectItem;
