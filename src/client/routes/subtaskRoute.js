import { Route, redirect } from '@tanstack/react-router';
import { rootRoute } from './rootRoute.js';
import SubtaskPage from '../pages/SubtaskPage.jsx';
import { getSubtaskById } from '../api/services.js';

export const subtaskRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/projects/subtask/$subtaskId',
  beforeLoad: ({ context, params: { subtaskId } }) => {
    const { isAuth } = context.authContext.session();
    if (!isAuth) {
      throw redirect({
        to: '/',
      });
    }

    const queryOptions = {
      queryKey: ['subtasks', subtaskId],
      queryFn: () => getSubtaskById(subtaskId),
      enabled: !!subtaskId,
    };
    return { queryOptions };
  },
  loader: async ({ context: { queryClient, queryOptions } }) => {
    await queryClient.ensureQueryData(queryOptions);
  },
  component: SubtaskPage,
});
