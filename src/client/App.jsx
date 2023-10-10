import { useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';
import { lazy } from 'react';

// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LoginForm from './views/components/loginForm';
import RegisterForm from './views/components/registerForm';


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
      <LoginForm />

      {/*<ReactQueryDevtools initialIsOpen />*/}
    </>
  );
}

export default App;