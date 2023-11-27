import { deleteProject } from '../../api/services.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

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
    <>
      <div className="absolute z-50 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[90%] max-w-[400px]">
        <div className="modal-box">
          <h3 className="text-lg font-bold text-center">
            Are you sure you want to delete this project?
          </h3>
          <div className="divider"></div>
          <p className="py-4">
            This will permanently delete the project, all its subtasks and time
            entries. You cannot undo this action.
          </p>
          <div className="modal-action">
            <button className="btn" onClick={() => closeFn(false)}>
              Cancel
            </button>
            <form
              method="dialog"
              onSubmit={() => deleteProjectMutation.mutate(projectId)}
            >
              <button type="submit" className="w-24 btn btn-primary">
                Delete
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteProjectModal;
