import { deleteProject } from '../../api/services.js';

const DeleteProjectModal = ({ projectId }) => {
  const handleDeleteProject = async () => {
    await deleteProject(projectId);
    document.getElementById('delete_project').close();
  };

  return (
    <>
      <dialog id="delete_project" className="modal modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">Are you sure you want to delete this project?</h3>
          <div className="divider"></div>
          <p className="py-4">
            This will permanently delete the project, all its subtasks and time entries. You cannot undo this action.
          </p>
          <div className="modal-action">
            <button className="btn" onClick={() => document.getElementById('delete_project').close()}>
              Cancel
            </button>
            <form method="dialog" onSubmit={() => handleDeleteProject()}>
              <button type="submit" className="w-24 btn btn-primary">
                Delete
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DeleteProjectModal;
