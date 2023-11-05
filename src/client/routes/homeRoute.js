import { Route, redirect } from '@tanstack/react-router';
import { rootRoute } from './rootRoute.js';
import LoginPage from '../pages/LoginPage.jsx';

export const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: ({ context }) => {
    const { isAuth } = context.authContext.session();
    if (isAuth) {
      throw redirect({
        to: '/projects',
      });
    }
  },
  component: LoginPage,
  loader: ({ context }) => context,
});
