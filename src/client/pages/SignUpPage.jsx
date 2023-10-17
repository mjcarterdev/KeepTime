import Logo from '../components/Logo';
import { useNavigation } from 'react-router-dom';

import Form from '../components/Form';
import { z } from 'zod';

const validation = z.object({
  name: z.string().trim().min(1).max(255),
  password: z.string().trim().min(8).max(255),
  confirm: z.string().trim().min(8).max(255),
  email: z.string().trim().min(1).max(255).email(),
});

const SignUpPage = () => {
  const { state } = useNavigation();

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

            <Form className="form-control" validator={validation} action="/profile">
              {(register, errors) => (
                <>
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
                    type="text"
                    placeholder="Type here"
                    className="w-full input input-bordered input-primary"
                    {...register('confirm', { required: true, minLength: 8 })}
                  />
                  <label className="label">
                    <span className={errors.confirm ? visible : hidden}>Min. of 8 characters</span>
                  </label>
                  <div className="flex pt-4 justify-evenly">
                    <button type="submit" disabled={state === 'submitting'} className="w-24 btn btn-primary">
                      {state === 'submitting' && <span className="loading loading-spinner loading-sm" />}
                      SignUp
                    </button>
                  </div>
                </>
              )}
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
