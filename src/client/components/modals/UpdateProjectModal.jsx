import { updateProjectById } from '../../api/services.js';
import { useForm } from 'react-hook-form';

const UpdateProjectModal = ({ project }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: project.title,
      description: project.description,
    },
  });

  const handleUpdateProject = async (data) => {
    data.projectId = project.id;
    await updateProjectById(data);
    document.getElementById('update_project').close();
  };

  const hidden = 'invisible label-text-alt';
  const visible = 'label-text-alt';

  return (
    <>
      <dialog id="update_project" className="modal modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">Update Project</h3>
          <div className="divider"></div>
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            id="update-project-name"
            type="text"
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
            id="update-project-description"
            className="w-full textarea textarea-bordered textarea-primary"
            {...register('description')}
          />
          <div className="modal-action">
            <button className="btn" onClick={() => document.getElementById('update_project').close()}>
              Cancel
            </button>
            <form method="dialog" onSubmit={handleSubmit(handleUpdateProject)}>
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

export default UpdateProjectModal;
