import Logo from '../components/Logo';
import { useForm } from 'react-hook-form';
import Skyline from '../images/skyline.svg';
import Button from '../components/Button';
import NavBar from '../components/Navbar';
import Card from '../components/Card';
import { Link, useNavigate } from 'react-router-dom';
import useRegistration from '../hooks/useRegistration';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const registrationSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().min(1, { message: 'Email is required' }).email({
      message: 'Must be a valid email',
    }),
    password: z
      .string()
      .min(6, { message: 'Password must be atleast 6 characters' }),
    confirm: z.string().min(1, { message: 'Confirm Password is required' }),
  })
  .refine((data) => data.password === data.confirm, {
    path: ['confirm'],
    message: 'Password and Confirm Password do not match',
  });

const SignUpPage = () => {
  const { user, errorMessage, setErrorMessage } = useContext(AuthContext);
  const { registerData, registerIsLoading, registerError, registerOnSubmit } =
    useRegistration();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
    delayError: 1000,
  });

  useEffect(() => {
    if (registerData) {
      toast.success('success register', {
        position: toast.POSITION.TOP_RIGHT,
        toastId: 'registerSuccess',
        className: 'notification',
      });
    }
    if (user) {
      navigate('/projects');
    }
  }, [user, registerData]);

  const onSubmit = async (data) => {
    registerOnSubmit(data);
  };

  const hidden = 'invisible label-text-alt';
  const visible = 'label-text-alt text-error';

  if (registerError) {
    toast.error(registerError.response.data.message, {
      position: toast.POSITION.TOP_RIGHT,
      toastId: 'registerError',
      className: 'notification',
    });
  }

  return (
    <>
      <div className="flex flex-col items-center min-h-screen gap-6 pt-20 pb-8 overflow-y-scroll bg-transparent background-image scrollbar-hide md:scrollbar-default">
        <NavBar />
        <div className="relative flex flex-col items-center justify-center">
          <Logo
            className={
              'absolute top-0 md:-top-5 text-6xl  md:text-8xl p-5 font-bold z-10 max-w-max90'
            }
          />
          <img src={Skyline} className="w-full pt-20 md:max-w-max50" />
        </div>

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
                {errors.password?.message}
              </span>
            </label>

            <label className="pt-2 pb-0 pl-4 label">
              <span className="label-text text-neutral-content">
                Confirm Password
              </span>
            </label>
            <input
              placeholder="Type here"
              className="w-full p-2 pl-4 bg-white border border-gray-100 rounded-md shadow-md input-ghost bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40 rounded-10px focus:outline-accent"
              type="password"
              name="confirm"
              autoComplete="on"
              {...register('confirm')}
            />
            <label className="label">
              <span className={errors.confirm ? visible : hidden}>
                {errors.confirm?.message}
              </span>
            </label>
            <div className="flex pt-4 justify-evenly">
              <Button
                type="submit"
                className="w-full"
                isLoading={registerIsLoading}
                disabled={!isDirty || !isValid}
                btnType={'default'}
              >
                Register
              </Button>
            </div>
            <p className="w-full pt-4 text-center">
              Or click{' '}
              <span>
                {
                  <Link to={'/'} from={'/signup'} className="text-accent">
                    here
                  </Link>
                }
              </span>{' '}
              to login up
            </p>
          </form>
        </Card>
        {errorMessage && (
          <div
            className="cursor-pointer toast-top toast-end"
            onClick={() => setErrorMessage(null)}
          >
            <div className="alert alert-error">
              <span>{errorMessage}</span>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default SignUpPage;
