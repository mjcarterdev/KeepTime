import { Route, redirect } from '@tanstack/react-router';
import { rootRoute } from './rootRoute.js';
import SubtaskPage from '../pages/SubtaskPage.jsx';
import { getAllSubtaskByProjectId } from '../api/services.js';

export const subtaskRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'project/subtask',
  beforeLoad: ({ context, params: subtaskId = 'c3af7e9f-e3c2-4f74-93cf-765460b54964' }) => {
    const { isAuth } = context.authContext.session();
    if (!isAuth) {
      throw redirect({
        to: '/login',
      });
    }
    const queryOptions = {
      queryKey: ['subtasks', subtaskId],
      queryFn: () => getAllSubtaskByProjectId('3110a449-99dc-42f1-a2ca-72889a3dc598'),
      enabled: !!subtaskId,
    };
    return { queryOptions };
  },
  loader: async ({ context: { queryClient, queryOptions } }) => {
    await queryClient.ensureQueryData(queryOptions);
  },
  component: SubtaskPage,
});
