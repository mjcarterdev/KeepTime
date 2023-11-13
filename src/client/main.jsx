import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  redirect,
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
import authProvider from './context/auth';

// Create a client
const queryClient = new QueryClient();

const projectLoader = async ({ request }) => {
  if (!authProvider.isAuth) {
    let params = new URLSearchParams();
    params.set('from', new URL(request.url).pathname);
    return redirect('/' + params.toString());
  }
  return { authProvider };
};

const authLoader = () => {
  if (authProvider.isAuth) {
    return redirect('/projects');
  }
  return { authProvider };
};

const loader = async () => {
  authProvider.getSession();
  return { authProvider };
};

const profileLoader = async ({ request }) => {
  if (!authProvider.isAuth) {
    let params = new URLSearchParams();
    params.set('from', new URL(request.url).pathname);
    return redirect('/' + params.toString());
  }
  return { authProvider };
};

const subtaskLoader = async ({ params }) => {
  const { subtaskId } = params;
  return { authProvider, subtaskId };
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
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsClosed />
    </QueryClientProvider>
  </React.StrictMode>,
);
