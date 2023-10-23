import SignUpPage from '../pages/SignUpPage.jsx';
import { rootRoute } from './rootRoute.js';
import { Route, redirect } from '@tanstack/react-router';

export const signUpRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'signup',
  component: SignUpPage,
  beforeLoad: ({ context }) => {
    const { isAuth } = context.authContext.session();
    if (isAuth) {
      throw redirect({
        to: '/projects',
      });
    }
  },
  loader: async ({ context }) => context,
});
