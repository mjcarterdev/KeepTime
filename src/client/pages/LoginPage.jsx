import Logo from '../components/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../api/services.js';
import { useMutation } from '@tanstack/react-query';

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(login, {
    onSuccess: () => navigate('/auth/profile'),
  });

  const onSubmit = (data) => mutation.mutate(data);

  const hidden = 'invisible label-text-alt';
  const visible = 'label-text-alt';

  return (
    <>
      <div className="h-[calc(100vh-4rem)] hero bg-base-100">
        <div className="text-center hero-content">
          <div className="max-w-md">
            <Logo className={'text-7xl lg:text-8xl font-bold'} />
            <p className="py-6 text-1xl lg:text-2xl">
              Unlock your productivity potential.
              <br />
              Your Time. Your Way.
            </p>
            <form className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="w-full input input-bordered input-primary"
                {...register('email', { required: true, maxLength: 20 })}
              />
              <label className="label">
                <span className={errors.email ? visible : hidden}>This is required</span>
              </label>

              <label className="pt-2 label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="w-full input input-bordered input-primary"
                {...register('password', { required: true, minLength: 8 })}
              />
              <label className="label">
                <span className={errors.password ? visible : hidden}>Min. of 8 characters</span>
              </label>
            </form>

            <div className="flex pt-4 justify-evenly">
              <button className="w-24 btn btn-primary" onClick={() => navigate(-1)}>
                Back
              </button>
              <button type="submit" onClick={handleSubmit(onSubmit)} className="w-24 btn btn-primary">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
