import authContext from './context/authContext';
import { Router } from '@tanstack/react-router';
import { rootRoute } from './routes/rootRoute.js';
import { homeRoute } from './routes/homeRoute.js';
import { signUpRoute } from './routes/signUpRoute';
import { aboutRoute } from './routes/aboutRoute';
import { projectRoute } from './routes/projectsRoute';
import { profileRoute } from './routes/profileRoute';
import { subtaskRoute } from './routes/subtaskRoute';

const routeTree = rootRoute.addChildren([
  homeRoute,
  signUpRoute,
  aboutRoute,
  projectRoute,
  subtaskRoute,
  profileRoute,
]);

const router = new Router({
  routeTree,
  context: { authContext },
});

export default router;
