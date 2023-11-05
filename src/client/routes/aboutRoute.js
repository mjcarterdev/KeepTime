import { Route } from '@tanstack/react-router';
import { rootRoute } from './rootRoute.js';
import AboutUsPage from '../pages/AboutUsPage.jsx';

export const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'about',
  component: AboutUsPage,
  loader: ({ context }) => context,
});
