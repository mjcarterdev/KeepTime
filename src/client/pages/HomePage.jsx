import Logo from '../components/Logo';
import { Link } from '@tanstack/react-router';
import Skyline from '../images/skyline.svg';
import AnimatedSun from '../components/AnimatedSun';

const HomePage = () => {
  return (
    <>
      <div className="flex items-center justify-center h-[calc(100vh-4rem)] bg-base-100">
        <div className="flex text-center">
          <div className="relative sm:max-w-screen-sm md:max-w-md lg:max-w-lg">
            <AnimatedSun />
            <Logo className={' text-5xl sm:text-5xl md:text-6xl p-5 font-bold z-10 relative '} />
            <img src={Skyline} className="relative bottom-8" />
            <p className="py-5 text-xl sm:text-2xl">
              Unlock your productivity potential.
              <br />
              Your Time. Your Way.
            </p>
            <div className="flex p-4 justify-evenly">
              <Link to={'/login'}>
                <button className="w-24 shadow-md btn btn-primary ">Login</button>
              </Link>

              <Link to={'/signup'}>
                <button className="w-24 btn btn-primary">Sign Up</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
