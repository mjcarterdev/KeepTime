import { useContext, useEffect, useState } from 'react';
import NavBar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/Button';
import Card from '../components/Card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { updateUser } from '../api/services';

const registrationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().min(1, { message: 'Email is required' }).email({
    message: 'Must be a valid email',
  }),
});

const ProfilePage = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
    delayError: 1000,
  });

  const queryClient = useQueryClient();

  const {
    mutate: updateUserOnSubmit,
    data: updateUserData,
    error: updateUserError,
    isLoading: updateUserIsLoading,
  } = useMutation({
    mutationFn: updateUser,
    onError: (error) => {
      setErrorMessage(error.response.data.error);
    },
    onSuccess: (data) => {
      setUser(data);
    },
  });

  const hidden = 'invisible label-text-alt';
  const visible = 'label-text-alt text-error';

  useEffect(() => {
    if (user === null) {
      navigate('/');
    }
  }, [user]);

  const onSubmit = async (data) => {
    updateUserOnSubmit(data);
  };

  return (
    <>
      <NavBar location="Profile" />
      <div
        className={`flex pb-32 pt-24 flex-col flex-1 h-[100vh] w-full gap-2 p-4 overflow-y-scroll md:items-center scrollbar-hide md:scrollbar-default `}
      >
        <Card>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="pb-1 pl-4 label">
              <span className="text-neutral-content label-text">Name</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Type here"
              className="w-full p-2 pl-4 bg-white border border-gray-100 rounded-md shadow-md input-ghost bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40 rounded-10px focus:outline-accent autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)] "
              {...register('name')}
            />
            <label className="pl-4 label">
              <span className={errors.name ? visible : hidden}>
                {errors.name?.message}
              </span>
            </label>

            <label className="pb-1 pl-4 label">
              <span className="text-neutral-content label-text">Email</span>
            </label>
            <input
              id="email"
              type="text"
              placeholder="Type here"
              className="w-full p-2 pl-4 bg-white border border-gray-100 rounded-md shadow-md input-ghost bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40 rounded-10px focus:outline-accent autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)] "
              {...register('email')}
            />
            <label className="pl-4 label">
              <span className={errors.email ? visible : hidden}>
                {errors.email?.message}
              </span>
            </label>
            <div className="flex pt-4 justify-evenly">
              <Button
                type="submit"
                className="w-full"
                btnType={'default'}
                isLoading={updateUserIsLoading}
              >
                Update User
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default ProfilePage;
