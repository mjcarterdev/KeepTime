import { postSubtask } from '../../api/services.js';
import { useForm } from 'react-hook-form';

const AddSubtaskModal = ({projectId}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddSubtask = async (data) => {
    data.projectId = projectId;
    await postSubtask(data);
    document.getElementById('add_new_subtask').close();
  };

  const hidden = 'invisible label-text-alt';
  const visible = 'label-text-alt';

  return (
    <>
      <dialog id="add_new_subtask" className="modal modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">Add New Subtask</h3>
          <div className="divider"></div>
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            id="subtask-name"
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
            id="subtask-description"
            placeholder="Text goes here"
            className="w-full textarea textarea-bordered textarea-primary"
            {...register('description')}
          />
          <div className="modal-action">
            <button className="btn" onClick={() => document.getElementById('add_new_subtask').close()}>
              Cancel
            </button>
            <form method="dialog" onSubmit={handleSubmit(handleAddSubtask)}>
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

export default AddSubtaskModal;
