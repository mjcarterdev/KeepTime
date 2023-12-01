import { updateTimeRecordById } from '../../api/services.js';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../Button.jsx';
import Modal from '../Modal.jsx';

const UpdateTimeModal = ({ timeRecord, closeFn }) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: {
      startDate: new Intl.DateTimeFormat('fr-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(new Date(timeRecord.startTime)),
      startTime: new Intl.DateTimeFormat('en-GB', {
        timeStyle: 'short',
      }).format(new Date(timeRecord.startTime)),
      endDate: new Intl.DateTimeFormat('fr-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(new Date(timeRecord.endTime)),
      endTime: new Intl.DateTimeFormat('en-GB', {
        timeStyle: 'short',
      }).format(new Date(timeRecord.endTime)),
    },
  });

  const updateTimeRecordMutation = useMutation({
    mutationFn: updateTimeRecordById,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return ['timeRecords', 'subtask'].includes(query.queryKey[0]);
        },
      });
    },
  });

  const handleUpdateTime = (data) => {
    data.timeRecordId = timeRecord.id;
    data.startTime = new Date(
      data.startDate + ' ' + data.startTime,
    ).toISOString();
    data.endTime = new Date(data.endDate + ' ' + data.endTime).toISOString();
    updateTimeRecordMutation.mutate(data);
    closeFn(false);
  };

  const hidden = 'invisible label-text-alt';
  const visible = 'label-text-alt text-error';

  return (
    <Modal title="Update Time">
      <div className="flex justify-center gap-8">
        <div className="join-vertical">
          <label className="label">
            <span className="label-text">Start Date</span>
          </label>
          <input
            id="update-start-date"
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
            id="update-start-time"
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
            id="update-end-date"
            type="date"
            className="join-item p-2 pl-4 bg-white border border-gray-100 rounded-md shadow-md input-ghost bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40 rounded-10px focus:outline-accent autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)]"
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
            id="update-end-time"
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
      <div className="modal-action">
        <button
          className="btn btn-ghost rounded-[25px]"
          onClick={() => closeFn(false)}
        >
          Cancel
        </button>
        <form method="dialog" onSubmit={handleSubmit(handleUpdateTime)}>
          <Button type="submit" btnType={'default'} className={'w-20'}>
            OK
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateTimeModal;
