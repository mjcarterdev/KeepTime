import { useNavigate } from 'react-router-dom';

import { deleteSubtask } from '../../api/services.js';

import Button from '../Button.jsx';

const DeleteSubtaskModal = ({ subtaskId }) => {
  const navigate = useNavigate();

  const handleDeleteSubtask = async () => {
    await deleteSubtask(subtaskId);
    document.getElementById('delete_subtask').close();
    navigate('/projects');
  };

  return (
    <>
      <dialog id="delete_subtask" className="modal modal-middle">
        <div className="modal-box max-w-[400px]">
          <h3 className="font-bold text-lg text-center">
            Are you sure you want to delete this subtask?
          </h3>
          <div className="divider"></div>
          <p className="py-4">
            This will permanently delete the subtask and its time entries. You
            cannot undo this action.
          </p>
          <div className="modal-action flex justify-end gap-2 pt-2">
            <Button
              onClick={() => document.getElementById('delete_subtask').close()}
            >
              Cancel
            </Button>
            <form method="dialog" onSubmit={() => handleDeleteSubtask()}>
              <Button type="submit" btnType={'default'}>
                Delete
              </Button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DeleteSubtaskModal;
