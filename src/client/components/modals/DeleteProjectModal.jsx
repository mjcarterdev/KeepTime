import { deleteProject } from '../../api/services.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Button from '../Button.jsx';
import Card from '../Card.jsx';
import Modal from '../Modal.jsx';

const DeleteProjectModal = ({ projectId, closeFn, setExpanded }) => {
  const queryClient = useQueryClient();
  const deleteProjectMutation = useMutation({
    mutationFn: deleteProject,
    onError: () => {
      setExpanded(false);
      toast.error('delete project Error', {
        position: toast.POSITION.TOP_RIGHT,
        toastId: 'deleteProjectError',
        className: 'notification',
      });
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setExpanded(false);
      toast.success(data.data.message, {
        position: toast.POSITION.TOP_RIGHT,
        toastId: 'deleteProjectSuccess',
        className: 'notification',
      });
      closeFn(false);
    },
  });

  return (
    <Modal>
      <p className="py-2">
        This will permanently delete the project, all its subtasks and time
        entries. You cannot undo this action.
      </p>

      <form onSubmit={() => deleteProjectMutation.mutate(projectId)}>
        <div className="flex justify-end gap-2 pt-2">
          <button className="btn btn-ghost" onClick={() => closeFn(false)}>
            Cancel
          </button>

          <Button btnType={'default'} className={'w-20'}>
            OK
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default DeleteProjectModal;
