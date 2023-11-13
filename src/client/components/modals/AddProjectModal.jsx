import { postProject } from '../../api/services.js';
import { useForm } from 'react-hook-form';

const AddProjectModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddProject = async (data) => {
    await postProject(data);
    document.getElementById('add_new_project').close();
  };

  const hidden = 'invisible label-text-alt';
  const visible = 'label-text-alt';

  return (
    <>
      <dialog id="add_new_project" className="modal modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">Add New Project</h3>
          <div className="divider"></div>
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            id="project-name"
            type="text"
            placeholder="Text goes here"
            className="w-full input input-bordered input-primary"
            {...register('title', { required: true })}
          />
          <label className="label">
            <span className={errors.title ? visible : hidden}>This is required</span>
          </label>
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            id="project-description"
            placeholder="Text goes here"
            className="w-full textarea textarea-bordered textarea-primary"
            {...register('description')}
          />
          <div className="modal-action">
            <button className="btn" onClick={() => document.getElementById('add_new_project').close()}>
              Cancel
            </button>
            <form method="dialog" onSubmit={handleSubmit(handleAddProject)}>
              <button type="submit" className="w-24 btn btn-primary">
                OK
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AddProjectModal;
