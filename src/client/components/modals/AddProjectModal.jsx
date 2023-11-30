import { postProject } from '../../api/services.js';
import { useForm } from 'react-hook-form';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '../Button.jsx';
import { toast } from 'react-toastify';
import Card from '../Card.jsx';
import Modal from '../Modal.jsx';

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
    <Modal title="Add a new Project?">
      <form onSubmit={handleSubmit(handleAddProject)}>
        <label className="pb-1 pl-4 label">
          <span className="text-neutral-content label-text">Name</span>
        </label>
        <input
          id="project-name"
          type="text"
          placeholder="Text goes here"
          className="w-full p-2 pl-4 bg-white border border-gray-100 rounded-md shadow-md input-ghost bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40 rounded-10px focus:outline-accent autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)] "
          {...register('title', { required: true })}
        />
        <label className="pl-4 label">
          <span className={errors.title ? visible : hidden}>
            {errors.title?.message}
          </span>
        </label>
        <div className="flex justify-end gap-2 pt-2">
          <button
            className="btn btn-ghost rounded-[25px]"
            onClick={() => closeFn(false)}
          >
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
    </Modal>
  );
};

export default AddProjectModal;
