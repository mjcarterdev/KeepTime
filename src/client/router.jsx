import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProjectPage from './pages/ProjectPage';
import ProfilePage from './pages/ProfilePage';
import AboutUsPage from './pages/AboutUsPage';
import App from './App';
import { createBrowserRouter } from 'react-router-dom';

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
        path: 'projects',
        element: <ProjectPage />,
      },
      {
        path: 'profile',
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
