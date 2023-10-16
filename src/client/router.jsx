import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProjectPage from './pages/ProjectPage';
import ProfilePage from './pages/ProfilePage';
import AboutUsPage from './pages/AboutUsPage';
import App from './App';
import { createBrowserRouter, redirect } from 'react-router-dom';
import { authProvider } from './providers/authProvider';

const protectedLoader = ({ request }) => {
  if (!authProvider.isAuthenticated) {
    let params = new URLSearchParams();
    params.set('from', new URL(request.url).pathname);
    return redirect('/login?' + params.toString());
  }
  return null;
};

const loginAction = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get('email');
  let password = formData.get('password');

  try {
    await authProvider.login({ email, password });
  } catch (error) {
    return {
      error: 'Invalid login attempt',
    };
  }
  return redirect('/auth/projects');
};

const loginLoader = () => {
  console.log('loginLoader: ', authProvider.isAuthenticated);
  if (authProvider.isAuthenticated) {
    return redirect('/auth/projects');
  }
  return null;
};

const registerAction = ({}) => {};
const registerLoader = ({}) => {};

//Creating routing in browers
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        loader() {
          console.log('/ path loader: ', authProvider.isAuthenticated);
          return { authenticated: authProvider.isAuthenticated };
        },
        Component: HomePage,
      },
      {
        path: 'login',
        action: loginAction,
        loader: loginLoader,
        Component: LoginPage,
      },
      {
        path: 'signup',
        action: registerAction,
        loader: registerLoader,
        Component: SignUpPage,
      },
      {
        path: '/auth/projects',
        loader: protectedLoader,
        Component: ProjectPage,
      },
      {
        path: '/auth/profile',
        loader: protectedLoader,
        Component: ProfilePage,
      },
      {
        path: 'about',
        Component: AboutUsPage,
      },
    ],
  },
  {
    path: '/auth/logout',
    async action() {
      await authProvider.logOut();
      return redirect('/');
    },
  },
]);

export default router;
