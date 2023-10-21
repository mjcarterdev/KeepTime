import authContext from './context/authContext';
import { Router } from '@tanstack/react-router';
import { rootRoute } from './routes/rootRoute.js';
import { loginRoute } from './routes/loginRoute.js';
import { homeRoute } from './routes/homeRoute.js';
import { signUpRoute } from './routes/signUpRoute';
import { aboutRoute } from './routes/aboutRoute';
import { projectRoute } from './routes/projectsRoute';
import { profileRoute } from './routes/profileRoute';

const routeTree = rootRoute.addChildren([homeRoute, loginRoute, signUpRoute, aboutRoute, projectRoute, profileRoute]);

const router = new Router({
  routeTree,
  context: { authContext },
});

export default router;
