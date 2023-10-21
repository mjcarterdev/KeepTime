import Logo from '../components/Logo';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import router from '../router';

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
      <div className="h-[calc(100vh-4rem)] hero bg-base-100">
        <div className="text-center hero-content">
          <div className="max-w-md">
            <Logo className={'text-7xl lg:text-8xl font-bold'} />
            <p className="py-6 text-1xl lg:text-2xl">Create an account to unlock your productivity potential.</p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="w-full input input-bordered input-primary"
                {...register('name', { required: true, minLength: 2 })}
              />
              <label className="label">
                <span className={errors.name ? visible : hidden}>Min. of 8 characters</span>
              </label>

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

              <label className=" label">
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

              <label className=" label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Type here"
                autoComplete="on"
                className="w-full input input-bordered input-primary"
                {...register('confirm', { required: true, minLength: 8 })}
              />
              <label className="label">
                <span className={errors.confirm ? visible : hidden}>Min. of 8 characters</span>
              </label>
              <div className="flex pt-4 justify-evenly">
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
