import { useEffect } from 'react';
import Logo from '../components/Logo';
import router from '../router';
import { useForm } from 'react-hook-form';
import { Link } from '@tanstack/react-router';

const LoginPage = ({ useLoader }) => {
  const { authContext } = useLoader();
  const { isAuth } = authContext.session();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    await authContext.login(data);
  };

  useEffect(() => {
    if (isAuth) {
      router.navigate('/projects');
    }
  }, [isAuth]);

  const hidden = 'invisible label-text-alt';
  const visible = 'label-text-alt text-error';

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
            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="text"
                placeholder="Type here"
                className="w-full input input-bordered input-primary"
                {...register('email')}
              />
              <label className="label">
                <span className={errors.email ? visible : hidden}>This is required</span>
              </label>

              <label className="pt-2 label">
                <span className="label-text">Password</span>
              </label>
              <input
                placeholder="Type here"
                className="w-full input input-bordered input-primary"
                type="password"
                name="password"
                autoComplete="on"
                {...register('password')}
              />
              <label className="label">
                <span className={errors.password ? visible : hidden}>Min. of 8 characters</span>
              </label>
              <div className="flex pt-4 justify-evenly">
                <button type="submit" className="w-24 btn btn-primary">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
