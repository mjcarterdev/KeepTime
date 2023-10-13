import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProjectPage from './pages/ProjectPage';
import ProfilePage from './pages/ProfilePage';
import AboutUsPage from './pages/AboutUsPage';
import App from './App';
import { createBrowserRouter, redirect } from 'react-router-dom';
import { authProvider } from './hooks/authProvider';

//Creating routing in browers
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
        loader() {
          // Our root route always provides the user, if logged in
          return { user: authProvider.username };
        },
      },
      {
        path: 'login',
        element: <LoginPage />,
        action: loginAction,
        loader: loginLoader,
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      },
      {
        path: 'projects',
        element: <ProjectPage />,
        loader: protectedLoader,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
        loader: protectedLoader,
      },
      {
        path: 'about',
        element: <AboutUsPage />,
      },
    ],
  },
  {
    path: '/logout',
    async action() {
      await authProvider.signout();
      return redirect('/');
    },
  },
]);

async function loginAction({ request }) {
  let formData = await request.formData();
  let username = formData.get('username');

  // Validate our form inputs and return validation errors via useActionData()
  if (!username) {
    return {
      error: 'You must provide a username to log in',
    };
  }

  // Sign in and redirect to the proper destination if successful.
  try {
    await authProvider.signIn(username);
  } catch (error) {
    // Unused as of now but this is how you would handle invalid
    // username/password combinations - just like validating the inputs
    // above
    return {
      error: 'Invalid login attempt',
    };
  }

  let redirectTo = formData.get('redirectTo');
  return redirect(redirectTo || '/');
}

async function loginLoader() {
  if (authProvider.isAuthenticated) {
    return redirect('/');
  }
  return null;
}

function protectedLoader({ request }) {
  if (!authProvider.isAuthenticated) {
    let params = new URLSearchParams();
    params.set('from', new URL(request.url).pathname);
    return redirect('/login?' + params.toString());
  }
  return null;
}

export default router;
