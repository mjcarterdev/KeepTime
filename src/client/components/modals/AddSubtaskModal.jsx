import { postSubtask } from '../../api/services.js';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '../Button.jsx';

const addSubtaskSchema = z.object({
  title: z.string().min(2, { message: 'Must be at least 2 characters' }),
  description: z.string({ message: 'is required' }),
});

const AddSubtaskModal = ({ projectId, closeFn, setExpanded }) => {
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: zodResolver(addSubtaskSchema),
    mode: 'onChange',
    delayError: 1000,
  });

  const handleOnSubmit = (data) => {
    addSubtaskMutation.mutate({
      title: data.title,
      description: data.description,
      projectId,
    });
  };

  const addSubtaskMutation = useMutation({
    mutationFn: postSubtask,
    onError: () => {
      setExpanded(false);
      toast.error('add subtask Error', {
        position: toast.POSITION.TOP_RIGHT,
        toastId: 'addSubtaskError',
        className: 'notification',
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      console.log(data.data);
      nav(`/subtask/${data.data.id}`);
      closeFn(false);
    },
  });

  const hidden = 'invisible label-text-alt';
  const visible = 'label-text-alt text-error';

  return (
    <>
      <div className="absolute z-50 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[90%] max-w-[400px]">
        <div className="modal-box">
          <h3 className="text-lg font-bold text-center">Add New Subtask</h3>
          <div className="divider"></div>
          <form method="dialog" onSubmit={handleSubmit(handleOnSubmit)}>
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              id="subtask-name"
              type="text"
              placeholder="Text goes here"
              className="w-full input input-bordered input-primary"
              {...register('title')}
            />
            <label className="label">
              <span className={errors.title ? visible : hidden}>
                {errors.title?.message}
              </span>
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

            <div className="flex justify-end gap-2 pt-2">
              <Button onClick={() => closeFn(false)}>Cancel</Button>
              <Button disabled={!isDirty || !isValid} btnType={'default'}>
                OK
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddSubtaskModal;
