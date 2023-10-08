import { useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';
import { lazy } from 'react';

function App() {
  // const { isLoading, error, data } = useQuery({
  //   queryKey: ['repoData'],
  //   queryFn: () =>
  //     axios.get('http://localhost:3001/api/home').then((res) => {
  //       console.log(res);
  //       return res.data;
  //     }),
  // });

  // if (isLoading) return 'Loading...';
  // if (error) return 'Error!';

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div className="shadow-xl card w-96 bg-base-100">
        <div className="card-body">
          <h2 className="card-title">Shoes!</h2>
          <p className="px-4 py-2 text-white sm:px-8 sm:py-3 bg-sky-700 hover:bg-sky-200">
            If a dog chews shoes whose shoes does he choose?
          </p>
          {/* <p>{data}</p> */}
          <div className="justify-end card-actions">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen />
    </>
  );
}

export default App;
