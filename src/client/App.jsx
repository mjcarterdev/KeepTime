import { useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';
import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './views/pages/Login';
import SignUp from './views/pages/SignUp';
import Home from './views/pages/Home';

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
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen />
    </>
  );
}

export default App;
