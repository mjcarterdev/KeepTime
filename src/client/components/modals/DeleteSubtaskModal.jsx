import { useNavigate } from 'react-router-dom';

import { deleteSubtask } from '../../api/services.js';

import Button from '../Button.jsx';
import Modal from '../Modal.jsx';

const DeleteSubtaskModal = ({ subtaskId, closeFn }) => {
  const navigate = useNavigate();

  const handleDeleteSubtask = async () => {
    await deleteSubtask(subtaskId);
    document.getElementById('delete_subtask').close();
    navigate('/projects');
  };

  return (
    <Modal title="Are you sure you want to delete this subtask?">
      <p className="py-4">
        This will permanently delete the subtask and its time entries. You
        cannot undo this action.
      </p>
      <div className="flex justify-end gap-2 pt-2 modal-action">
        <button
          className="btn btn-ghost rounded-[25px]"
          onClick={() => closeFn(false)}
        >
          Cancel
        </button>
        <form method="dialog" onSubmit={() => handleDeleteSubtask()}>
          <Button type="submit" btnType={'default'}>
            Delete
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default DeleteSubtaskModal;
