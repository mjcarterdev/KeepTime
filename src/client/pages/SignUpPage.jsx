import Logo from '../components/Logo';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import router from '../router';
import NavBar from '../components/Navbar';

const SignUpPage = ({ useLoader }) => {
  const { authContext } = useLoader();
  const { isAuth } = authContext.session();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    await authContext.register(data);
  };

  useEffect(() => {
    if (isAuth) {
      router.navigate('/projects');
    }
  }, [isAuth]);

  const hidden = 'invisible label-text-alt';
  const visible = 'label-text-alt';

  return (
    <>
      <NavBar authContext={authContext} />
      <div className="flex items-center justify-center h-[calc(100vh-4rem)] bg-base-100">
        <div className="flex p-2 text-center sm:max-w-screen-sm md:max-w-md ">
          <div className="max-w-screen-md max-h-screen ">
            <Logo className={'text-7xl lg:text-8xl font-bold'} />
            <p className="py-6 text-1xl lg:text-2xl">
              Create an account to unlock your productivity potential.
            </p>

            <form className="px-4" onSubmit={handleSubmit(onSubmit)}>
              <label className="p-1 leading-3 label">
                <span className="label-text">Name</span>
                <span className={errors.name ? visible : hidden}>
                  Min. of 8 characters
                </span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="w-full input input-bordered input-primary"
                {...register('name', { required: true, minLength: 2 })}
              />

              <label className="label">
                <span className="label-text">Email</span>
                <span className={errors.email ? visible : hidden}>
                  This is required
                </span>
              </label>
              <input
                id="email"
                type="text"
                placeholder="Type here"
                className="w-full input input-bordered input-primary"
                {...register('email')}
              />

              <label className=" label">
                <span className="label-text">Password</span>
                <span className={errors.password ? visible : hidden}>
                  Min. of 8 characters
                </span>
              </label>
              <input
                placeholder="Type here"
                className="w-full input input-bordered input-primary"
                type="password"
                name="password"
                autoComplete="on"
                {...register('password')}
              />

              <label className=" label">
                <span className="label-text">Confirm Password</span>
                <span className={errors.confirm ? visible : hidden}>
                  Min. of 8 characters
                </span>
              </label>
              <input
                type="password"
                placeholder="Type here"
                autoComplete="on"
                className="w-full input input-bordered input-primary"
                {...register('confirm', { required: true, minLength: 8 })}
              />
              <div className="flex p-4 justify-evenly">
                <button type="submit" className="w-24 btn btn-primary">
                  SignUp
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
