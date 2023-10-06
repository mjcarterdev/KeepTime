import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

function App() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () => {
      axios.get('http://localhost:3001/home').then((res) => {
        console.log(res);
        return res.data;
      });
    },
  });

  test();

  if (isLoading) return 'Loading...';
  if (error) return 'Error!';

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Shoes!</h2>
          <p className='" bg-sky-700 text-white hover:bg-sky-800" px-4 py-2 sm:px-8 sm:py-3'>
            If a dog chews shoes whose shoes does he choose?This is working
          </p>
          <p>{data}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR!
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
