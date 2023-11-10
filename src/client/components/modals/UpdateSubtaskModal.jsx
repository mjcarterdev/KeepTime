import { updateSubtaskById } from '../../api/services.js';
import { useForm } from 'react-hook-form';

const UpdateSubtaskModal = ({ subtask }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: subtask.title,
      description: subtask.description,
    },
  });

  const handleUpdateSubtask = async (data) => {
    data.subtaskId = subtask.id;
    await updateSubtaskById(data);
    document.getElementById('update_subtask').close();
  };

  const hidden = 'invisible label-text-alt';
  const visible = 'label-text-alt';

  return (
    <>
      <dialog id="update_subtask" className="modal modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">Update Subtask</h3>
          <div className="divider"></div>
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            id="subtaskTitle"
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
            id="update-subtask-description"
            className="w-full textarea textarea-bordered textarea-primary"
            {...register('description')}
          />
          <div className="modal-action">
            <button className="btn" onClick={() => document.getElementById('update_subtask').close()}>
              Cancel
            </button>
            <form method="dialog" onSubmit={handleSubmit(handleUpdateSubtask)}>
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

export default UpdateSubtaskModal;
