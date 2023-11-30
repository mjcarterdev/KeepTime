import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';
import App from './App';
import SignUpPage from './pages/SignUpPage';
import ProjectPage from './pages/ProjectPage';
import ProfilePage from './pages/ProfilePage';
import AboutUsPage from './pages/AboutUsPage';
import SubtaskPage from './pages/SubtaskPage';
import AuthContextProvider from './context/AuthContext';
import { getUser } from './api/services';

// Create a client
const queryClient = new QueryClient();

const projectLoader = async () => {
  return null;
};

const authLoader = () => {
  const {
    data: user,
    isLoading: userIsLoading,
    isError: userIsError,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });
  return { user, userIsError, userIsLoading };
};

const loader = async () => {
  return null;
};

const profileLoader = async () => {
  return null;
};

const subtaskLoader = async ({ params }) => {
  const { subtaskId } = params;
  return { subtaskId };
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<App />}
      loader={loader}
      errorElement={<ErrorPage />}
    >
      <Route path="/" index element={<LoginPage />} loader={authLoader} />
      <Route path="/signup" element={<SignUpPage />} loader={authLoader} />
      <Route path="/about" element={<AboutUsPage />} loader={loader} />
      <Route
        path="/projects"
        element={<ProjectPage />}
        loader={projectLoader}
      />

      <Route
        path={'/subtask/:subtaskId'}
        element={<SubtaskPage />}
        loader={subtaskLoader}
      />
      <Route path="/profile" element={<ProfilePage />} loader={profileLoader} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsClosed />
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
