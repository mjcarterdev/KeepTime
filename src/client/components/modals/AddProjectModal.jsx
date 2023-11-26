import { postProject } from '../../api/services.js';
import { useForm } from 'react-hook-form';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '../Button.jsx';
import { toast } from 'react-toastify';

const addProjectSchema = z.object({
  title: z.string().min(2, { message: 'Must be at least 2 characters' }),
});

const AddProjectModal = ({ closeFn }) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: zodResolver(addProjectSchema),
    mode: 'onChange',
    delayError: 1000,
  });

  const addProjectMutation = useMutation({
    mutationFn: postProject,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success(`Project ${data.data.title} was added`, {
        position: toast.POSITION.TOP_RIGHT,
        toastId: 'addProjectSuccess',
        className: 'notification',
      });
      closeFn(false);
    },
  });

  const handleAddProject = async (data) => {
    addProjectMutation.mutate(data);
  };

  const hidden = 'invisible label-text-alt';
  const visible = 'label-text-alt text-error';

  return (
    <>
      <div className="absolute z-50 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[90%] max-w-[400px]">
        <div className="modal-box">
          <h3 className="text-lg font-bold text-center">Add New Project</h3>
          <div className="divider"></div>
          <form onSubmit={handleSubmit(handleAddProject)}>
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
            <label className=" label">
              <span className={errors.title ? visible : hidden}>
                {errors.title?.message}
              </span>
            </label>
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

export default AddProjectModal;
