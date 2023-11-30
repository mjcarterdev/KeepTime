import { postTimeRecord } from '../../api/services.js';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../Button.jsx';
import Modal from '../Modal.jsx';

const AddTimeModal = ({ projectId, subtaskId, closeFn }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const addTimeMutation = useMutation({
    mutationFn: postTimeRecord,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['timeRecords'] });
    },
  });

  const handleAddTime = async (data) => {
    data.projectId = projectId;
    data.subtaskId = subtaskId;
    data.startTime = new Date(
      data.startDate + ' ' + data.startTime,
    ).toISOString();
    data.endTime = new Date(data.endDate + ' ' + data.endTime).toISOString();
    addTimeMutation.mutate(data);
    closeFn(false);
  };

  const hidden = 'invisible label-text-alt';
  const visible = 'label-text-alt';

  return (
    <Modal title="Add Time">
      <div className="flex justify-center gap-8">
        <div className="join-vertical">
          <label className="label">
            <span className="label-text">Start Date</span>
          </label>
          <input
            id="start-date"
            type="date"
            className="join-item p-2 pl-4 bg-white border border-gray-100 rounded-md shadow-md input-ghost bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40 rounded-10px focus:outline-accent autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)]"
            {...register('startDate', { required: true })}
          />
          <label className="label">
            <span className={errors.title ? visible : hidden}>
              This is required
            </span>
          </label>
        </div>

        <div className="join-vertical">
          <label className="label">
            <span className="label-text">Time</span>
          </label>
          <input
            id="start-time"
            type="time"
            className="join-item p-2 pl-4 bg-white border border-gray-100 rounded-md shadow-md input-ghost bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40 rounded-10px focus:outline-accent autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)]"
            {...register('startTime', { required: true })}
          />
          <label className="label">
            <span className={errors.title ? visible : hidden}>
              This is required
            </span>
          </label>
        </div>
      </div>

      <div className="flex justify-center gap-8">
        <div className="join-vertical">
          <label className="label">
            <span className="label-text">End Date</span>
          </label>
          <input
            id="end-date"
            type="date"
            className="join-item p-2 pl-4 bg-white border border-gray-100 rounded-md shadow-md input-ghost bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40 rounded-10px focus:outline-accent autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)] "
            {...register('endDate', { required: true })}
          />
          <label className="label">
            <span className={errors.title ? visible : hidden}>
              This is required
            </span>
          </label>
        </div>
        <div className="join-vertical">
          <label className="label">
            <span className="label-text">Time</span>
          </label>
          <input
            id="end-time"
            type="time"
            className="join-item p-2 pl-4 bg-white border border-gray-100 rounded-md shadow-md input-ghost bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40 rounded-10px focus:outline-accent autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)]"
            {...register('endTime', { required: true })}
          />
          <label className="label">
            <span className={errors.title ? visible : hidden}>
              This is required
            </span>
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2 modal-action">
        <Button
          className="btn btn-ghost rounded-[25px]"
          onClick={() => closeFn(false)}
        >
          Cancel
        </Button>
        <form method="dialog" onSubmit={handleSubmit(handleAddTime)}>
          <Button type="submit" btnType={'default'} className={'w-20'}>
            OK
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default AddTimeModal;
