import { postTimeRecord } from '../../api/services.js';
import { useForm } from 'react-hook-form';

const AddTimeModal = ({ projectId, subtaskId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddTime = async (data) => {
    data.projectId = projectId;
    data.subtaskId = subtaskId;
    data.startTime = new Date(data.startDate + ' ' + data.startTime).toISOString();
    data.endTime = new Date(data.endDate + ' ' + data.endTime).toISOString();
    await postTimeRecord(data);
    document.getElementById('add_time').close();
  };

  const hidden = 'invisible label-text-alt';
  const visible = 'label-text-alt';

  return (
    <>
      <dialog id="add_time" className="modal modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">Add Time</h3>
          <div className="divider"></div>
          <div class="join">
            <div class="join-vertical">
              <label className="label">
                <span className="label-text">Start Date</span>
              </label>
              <input
                id="start-date"
                type="date"
                className="join-item input input-primary"
                {...register('startDate', { required: true })}
              />
              <label className="label">
                <span className={errors.title ? visible : hidden}>This is required</span>
              </label>
            </div>
            <div class="join-vertical">
              <label className="label">
                <span className="label-text">Time</span>
              </label>
              <input
                id="start-time"
                type="time"
                className="join-item input input-primary"
                {...register('startTime', { required: true })}
              />
              <label className="label">
                <span className={errors.title ? visible : hidden}>This is required</span>
              </label>
            </div>
          </div>
          <div class="join">
            <div class="join-vertical">
              <label className="label">
                <span className="label-text">End Date</span>
              </label>
              <input
                id="end-date"
                type="date"
                className="join-item input input-primary"
                {...register('endDate', { required: true })}
              />
              <label className="label">
                <span className={errors.title ? visible : hidden}>This is required</span>
              </label>
            </div>
            <div class="join-vertical">
              <label className="label">
                <span className="label-text">Time</span>
              </label>
              <input
                id="end-time"
                type="time"
                className="join-item input input-primary"
                {...register('endTime', { required: true })}
              />
              <label className="label">
                <span className={errors.title ? visible : hidden}>This is required</span>
              </label>
            </div>
          </div>
          <div className="modal-action">
            <button className="btn" onClick={() => document.getElementById('add_time').close()}>
              Cancel
            </button>
            <form method="dialog" onSubmit={handleSubmit(handleAddTime)}>
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

export default AddTimeModal;
