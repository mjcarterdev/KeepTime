import { rootRoute } from './rootRoute.js';
import LoginPage from '../pages/LoginPage.jsx';
import { Route, redirect } from '@tanstack/react-router';

export const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'login',
  beforeLoad: ({ context }) => {
    const { isAuth } = context.authContext.session();
    if (isAuth) {
      throw redirect({
        to: '/projects',
      });
    }
  },
  component: LoginPage,
  loader: async ({ context }) => context,
});
