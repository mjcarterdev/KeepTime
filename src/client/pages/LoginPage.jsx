import { useEffect } from 'react';
import Logo from '../components/Logo';
import router from '../router';
import { useForm } from 'react-hook-form';
import Skyline from '../images/skyline.svg';
import Button from '../components/Button';
import NavBar from '../components/Navbar';
import Card from '../components/Card';
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
      <div className="flex flex-col items-center gap-6 h-[100vh] overflow-hidden bg-transparent">
        <NavBar authContext={authContext} />
        <div className="relative flex flex-col items-center justify-center">
          <Logo
            className={
              'absolute top-0 md:-top-5 text-6xl  md:text-8xl p-5 font-bold z-10 max-w-max90'
            }
          />
          <img src={Skyline} className="px-4 pt-20 md:max-w-max90" />
        </div>
        <div className="card">
          <p className="py-5 text-2xl leading-loose text-center text-neutral-content sm:text-2xl">
            Unlock your productivity potential.
            <br />
            Your Time. Your Way.
          </p>
        </div>
        <Card>
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
                This is required
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
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <p className="w-full pt-4 text-center">
              Or click{' '}
              <spam>
                {
                  <Link to={'/signup'} from={'/'} className="text-accent">
                    here
                  </Link>
                }
              </spam>{' '}
              to sign up
            </p>
          </form>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;
