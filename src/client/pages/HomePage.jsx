import Logo from '../components/Logo';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <div className="h-[calc(100vh-4rem)] hero bg-base-100">
        <div className="text-center hero-content">
          <div className="max-w-md">
            <Logo className={'text-7xl lg:text-8xl font-bold'} />
            <p className="py-6 text-1xl lg:text-2xl">
              Unlock your productivity potential.
              <br />
              Your Time. Your Way.
            </p>
            <div className="flex justify-evenly">

                <Link to={'/login'} className="w-24 btn btn-primary">
                  <div>
                  Login    
                  </div>
                </Link>
             
                <Link to={'/signup'} className="w-24 btn btn-primary">
                  <div>
                    Sign Up
                  </div>
                </Link>

                <Link to={'/timer'} className="w-24 btn btn-primary">
                  <div>
                    Timer    
                  </div>
                </Link>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
