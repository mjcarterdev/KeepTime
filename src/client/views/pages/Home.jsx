import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div className="shadow-xl card w-96 bg-base-100">
        <div className="card-body">
          <h2 className="card-title">Shoes!</h2>
          <p className="px-4 py-2 text-white sm:px-8 sm:py-3 bg-sky-700 hover:bg-sky-200">
            If a dog chews shoes whose shoes does he choose?
          </p>
          <div className="justify-end card-actions">
            <button className="btn btn-primary">
              <Link to="/login">Log in</Link>
            </button>
            <button className="btn btn-primary">
              <Link to="/signup">Sign up</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
