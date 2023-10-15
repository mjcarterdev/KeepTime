import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProjectPage from './pages/ProjectPage';
import ProfilePage from './pages/ProfilePage';
import AboutUsPage from './pages/AboutUsPage';
import App from './App';
import { createBrowserRouter, redirect } from 'react-router-dom';

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
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      },
      {
        path: 'auth/projects',
        element: <ProjectPage />,
      },
      {
        path: 'auth/profile',
        element: <ProfilePage />,
      },
      {
        path: 'about',
        element: <AboutUsPage />,
      },
    ],
  },
]);

export default router;
