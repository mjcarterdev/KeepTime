import Logo from '../components/Logo';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      console.log("Password and Confirm Password do not match.");
      return;
    }
    console.log(data);
  };

  const hidden = 'invisible label-text-alt';
  const visible = 'label-text-alt';

  useEffect(() => {
    const timer = setTimeout(() => {
      clearErrors();
    }, 10000);
    return () => clearTimeout(timer);
  }, [errors]);

  return (
    <>
      <div className="h-[calc(100vh-4rem)] hero bg-base-100">
        <div className="text-center hero-content">
          <div className="max-w-md">
            <Logo className={'text-7xl lg:text-8xl font-bold'} />
            <p className="py-6 text-1xl lg:text-2xl">
              Create an account to unlock your productivity potential.
            </p>
            <form className="form-control"  >
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Type your name"
                className="w-full input input-bordered input-primary"
                {...register('name', { required: true })}
              />

              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="Type your email"
                className="w-full input input-bordered input-primary"
                {...register('email', { required: true, maxLength: 20 })}
              />
              <label className="label">
                <span className={errors.email ? visible : hidden}>This is required</span>
              </label>

              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password" 
                placeholder="Type your password"
                className="w-full input input-bordered input-primary"
                {...register('password', { required: true, minLength: 8 })}
              />

              <label className="label">
                <span className={errors.password ? visible : hidden}>Min. of 8 characters</span>
              </label>

              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password" 
                placeholder="Type your password again"
                className="w-full input input-bordered input-primary"
                {...register('confirmPassword', {
                  required: true,
                  validate: (value) => value === watch('password'),
                })}
              />
              <label className="label">
                <span className={errors.confirmPassword ? visible : hidden}>Passwords must match</span>
              </label>
            </form>
            <div className="flex pt-4 justify-evenly">

                  <Link to={'/'} className="w-24 btn btn-primary">
                    <div>Back</div>
                  </Link>

                  <Link to={'/projects'} onClick={handleSubmit(onSubmit)} className="w-24 btn btn-primary">
                    <div>Sign Up</div>
                  </Link>
                
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
