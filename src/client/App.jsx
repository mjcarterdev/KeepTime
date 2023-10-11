import { useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';
import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './views/components/loginForm';
import Register from './views/components/registerForm';
import Home from './views/components/home';

function App() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      axios.get('http://localhost:3001/api/home').then((res) => {
        console.log(res);
        return res.data;
      }),
  });

  if (isLoading) return 'Loading...';
  if (error) return 'Error!';


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/next" />
      </Routes>
    </>
  );
}

export default App;