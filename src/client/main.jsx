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
import { ProtectedRoute } from './pages/ProtectedRoute';

// Create a client
const queryClient = new QueryClient();

const subtaskLoader = async ({ params }) => {
  const { subtaskId } = params;
  return { subtaskId };
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route path="/" index element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/about" element={<AboutUsPage />} />
      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <ProjectPage />
          </ProtectedRoute>
        }
      />

      <Route
        path={'/subtask/:subtaskId'}
        element={
          <ProtectedRoute>
            <SubtaskPage />
          </ProtectedRoute>
        }
        loader={subtaskLoader}
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
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
