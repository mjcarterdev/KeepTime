import React from 'react';
import ReactDOM from 'react-dom/client';
import router from './router';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import authContext from './context/authContext';

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={authContext} />
      <ReactQueryDevtools initialIsClosed />
    </QueryClientProvider>
  </React.StrictMode>,
);
