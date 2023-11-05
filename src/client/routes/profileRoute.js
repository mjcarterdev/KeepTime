import { Route, redirect } from '@tanstack/react-router';
import { rootRoute } from './rootRoute.js';
import ProfilePage from '../pages/ProfilePage.jsx';

export const profileRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'profile',
  loader: ({ context }) => context,
  component: ProfilePage,
  beforeLoad: ({ context }) => {
    const { isAuth } = context.authContext.session();
    if (!isAuth) {
      throw redirect({
        to: '/',
      });
    }
  },
});
