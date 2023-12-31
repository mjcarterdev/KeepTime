import Logo from '../components/Logo';
import { useForm } from 'react-hook-form';
import Skyline from '../images/skyline.svg';
import Button from '../components/Button';
import NavBar from '../components/Navbar';
import Card from '../components/Card';
import { Link, useNavigate } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const loginSchema = z.object({
  email: z.string().min(2, { message: 'Email is required' }).email({
    message: 'Must be a valid email',
  }),
  password: z
    .string()
    .min(6, { message: 'Password must be atleast 6 characters' }),
});

const LoginPage = () => {
  const { loginOnSubmit, loginError, loginIsLoading } = useLogin();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    delayError: 1000,
  });

  const hidden = 'invisible label-text-alt';
  const visible = 'label-text-alt text-error';

  useEffect(() => {
    if (user) {
      navigate('/projects');
    }
  }, [user]);

  const onSubmit = async (data) => {
    loginOnSubmit(data);
  };

  if (loginError) {
    toast.error(loginError.response.data.error, {
      position: toast.POSITION.TOP_RIGHT,
      toastId: 'loginError',
      className: 'notification',
    });
  }

  return (
    <>
      <div className="flex flex-col items-center min-h-screen gap-6 p-4 pt-20 pb-8 overflow-y-scroll bg-transparent background-image scrollbar-hide md:scrollbar-default">
        <NavBar />
        <div className="relative flex flex-col items-center justify-center pt-4">
          <Logo
            className={
              'absolute top-4  text-6xl  md:text-8xl p-5 font-bold z-10 max-w-max90'
            }
          />
          <img src={Skyline} className="w-full pt-20 md:max-w-[40rem]" />
        </div>
        <div className="card ">
          <p className="py-1 text-xl leading-loose text-center text-neutral-content md:text-2xl">
            Unlock your productivity potential.
            <br />
            Your Time. Your Way.
          </p>
        </div>
        <Card className={'bg-opacity-40'}>
          <form onSubmit={handleSubmit(onSubmit)}>
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

            <label className="pt-2 pb-0 pl-4 label">
              <span className="label-text text-neutral-content">Password</span>
            </label>
            <input
              placeholder="Type here"
              className="w-full p-2 pl-4 bg-white border border-gray-100 rounded-md shadow-md input-ghost bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40 rounded-10px focus:outline-accent"
              type="password"
              name="password"
              autoComplete="on"
              {...register('password')}
            />
            <label className="label">
              <span className={errors.password ? visible : hidden}>
                Min. of 8 characters
              </span>
            </label>
            <div className="flex pt-4 justify-evenly">
              <Button
                type="submit"
                className="w-full"
                disabled={!isDirty || !isValid}
                isLoading={loginIsLoading}
                btnType={'default'}
              >
                Login
              </Button>
            </div>
            <p className="w-full pt-4 text-center">
              Or click{' '}
              <span>
                {
                  <Link to={'/signup'} from={'/'} className="text-accent">
                    here
                  </Link>
                }
              </span>{' '}
              to sign up
            </p>
          </form>
        </Card>
        <ToastContainer hideProgressBar limit={3} />
      </div>
    </>
  );
};

export default LoginPage;
