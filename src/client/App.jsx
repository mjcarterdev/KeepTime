import { useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';

const test = () => {
  const value = 1;
  console.log(value);
};

function App() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      axios.get('http://localhost:3001/home').then((res) => {
        console.log(res);
        return res.data;
      }),
  });

  test();

  if (isLoading) return 'Loading...';
  if (error) return 'Error!';

  return (
    <>
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      <div className='card w-96 bg-base-100 shadow-xl'>
        <div className='card-body'>
          <h2 className='card-title'>Shoes!</h2>
          <p className='"text-white hover:bg-sky-800" bg-sky-700 px-4 py-2 sm:px-8 sm:py-3'>
            If a dog chews shoes whose shoes does he choose?
          </p>
          <p>{data}</p>
          <div className='card-actions justify-end'>
            <button className='btn btn-primary'>Buy Now</button>
          </div>
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen />
    </>
  );
}

export default App;
