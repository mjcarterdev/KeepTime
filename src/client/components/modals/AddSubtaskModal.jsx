import { postSubtask } from '../../api/services.js';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '../Button.jsx';
import Card from '../Card.jsx';

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
        <Card className={'shadow-2xl gap-4'}>
          <span className="px-4 text-xl font-medium text-center normal-case ">
            <h2>Add New Subtask </h2>
          </span>
          <div className="mt-0 mb-0 divider"></div>
          <form method="dialog" onSubmit={handleSubmit(handleOnSubmit)}>
            <label className="pb-1 pl-4 label">
              <span className="text-neutral-content label-text">Name</span>
            </label>
            <input
              id="subtask-name"
              type="text"
              placeholder="Text goes here"
              className="w-full p-2 pl-4 bg-white border border-gray-100 rounded-md shadow-md input-ghost bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40 rounded-10px focus:outline-accent autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)] "
              {...register('title')}
            />
            <label className="pl-4 label">
              <span className={errors.title ? visible : hidden}>
                {errors.title?.message}
              </span>
            </label>
            <label className="pb-1 pl-4 label">
              <span className="text-neutral-content label-text">
                Description
              </span>
            </label>
            <textarea
              id="subtask-description"
              placeholder="Text goes here"
              className="w-full p-2 pl-4 bg-white border border-gray-100 rounded-md shadow-md input-ghost bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40 rounded-10px focus:outline-accent autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)] "
              {...register('description')}
            />

            <div className="flex justify-end gap-2 pt-2">
              <button className="btn btn-ghost" onClick={() => closeFn(false)}>
                Cancel
              </button>

              <Button
                disabled={!isDirty || !isValid}
                btnType={'default'}
                className={'w-20'}
              >
                OK
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddSubtaskModal;
