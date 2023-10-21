import { Route, redirect } from '@tanstack/react-router';
import { rootRoute } from './rootRoute.js';
import ProjectPage from '../pages/ProjectPage.jsx';

export const projectRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'projects',
  component: ProjectPage,
  beforeLoad: ({ context }) => {
    const { isAuth } = context.authContext.session();
    if (!isAuth) {
      throw redirect({
        to: '/login',
      });
    }
  },
});
