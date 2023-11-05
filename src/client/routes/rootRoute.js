import App from '../App';
import { RouterContext } from '@tanstack/react-router';

const routerContext = new RouterContext();
export const rootRoute = routerContext.createRootRoute({
  component: App,
  loader: ({ context }) => context,
});
