import { Route, redirect } from '@tanstack/react-router';
import { rootRoute } from './rootRoute.js';
import ProjectPage from '../pages/ProjectPage.jsx';
import { getAllProjects } from '../api/services.js';

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
    const queryGetAllProjectsOptions = {
      queryKey: ['projects'],
      queryFn: () => getAllProjects(),
      enabled: !!isAuth,
    };
    return { queryGetAllProjectsOptions };
  },
  loader: async ({ context: { queryClient, queryGetAllProjectsOptions } }) => {
    await queryClient.ensureQueryData(queryGetAllProjectsOptions);
  },
});
