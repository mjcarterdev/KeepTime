import { updateTimeRecordById } from '../../api/services.js';
import { useForm } from 'react-hook-form';

const UpdateTimeModal = ({ timeRecord }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startDate: new Intl.DateTimeFormat('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(
        new Date(timeRecord.startTime),
      ),
      startTime: new Intl.DateTimeFormat('en-GB', {
        timeStyle: 'short',
      }).format(new Date(timeRecord.startTime)),
      endDate: new Intl.DateTimeFormat('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(
        new Date(timeRecord.endTime),
      ),
      endTime: new Intl.DateTimeFormat('en-GB', {
        timeStyle: 'short',
      }).format(new Date(timeRecord.endTime)),
    },
  });

  const handleUpdateTime = async (data) => {
    data.timeRecordId = timeRecord.id;
    data.startTime = new Date(data.startDate + ' ' + data.startTime).toISOString();
    data.endTime = new Date(data.endDate + ' ' + data.endTime).toISOString();
    await updateTimeRecordById(data);
    document.getElementById('update_time_record').close();
  };

  const hidden = 'invisible label-text-alt';
  const visible = 'label-text-alt';

  return (
    <>
      <dialog id="update_time_record" className="modal modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">Update Time</h3>
          <div className="divider"></div>
          <div className="join">
            <div className="join-vertical">
              <label className="label">
                <span className="label-text">Start Date</span>
              </label>
              <input
                id="update-start-date"
                type="date"
                className="join-item input input-primary"
                {...register('startDate', { required: true })}
              />
              <label className="label">
                <span className={errors.title ? visible : hidden}>This is required</span>
              </label>
            </div>
            <div className="join-vertical">
              <label className="label">
                <span className="label-text">Time</span>
              </label>
              <input
                id="update-start-time"
                type="time"
                className="join-item input input-primary"
                {...register('startTime', { required: true })}
              />
              <label className="label">
                <span className={errors.title ? visible : hidden}>This is required</span>
              </label>
            </div>
          </div>
          <div className="join">
            <div className="join-vertical">
              <label className="label">
                <span className="label-text">End Date</span>
              </label>
              <input
                id="update-end-date"
                type="date"
                className="join-item input input-primary"
                {...register('endDate', { required: true })}
              />
              <label className="label">
                <span className={errors.title ? visible : hidden}>This is required</span>
              </label>
            </div>
            <div className="join-vertical">
              <label className="label">
                <span className="label-text">Time</span>
              </label>
              <input
                id="update-end-time"
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
            <button className="btn" onClick={() => document.getElementById('update_time_record').close()}>
              Cancel
            </button>
            <form method="dialog" onSubmit={handleSubmit(handleUpdateTime)}>
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

export default UpdateTimeModal;
