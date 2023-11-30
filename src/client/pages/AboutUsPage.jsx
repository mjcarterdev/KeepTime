import NavBar from '../components/Navbar';
import Logo from '../components/Logo';
import Skyline from '../images/skyline.svg';
import Card from '../components/Card';

const AboutUsPage = () => {
  return (
    <>
      <div className="flex flex-col items-center min-h-screen gap-6 p-4 pt-20 pb-8 overflow-y-scroll bg-transparent background-image scrollbar-hide md:scrollbar-default">
        <NavBar location="About Us" />
        <div className="relative flex flex-col items-center justify-center pt-4">
          <Logo
            className={
              'absolute top-4  text-6xl  md:text-8xl p-5 font-bold z-10 max-w-max90'
            }
          />
          <img src={Skyline} className="w-full pt-20 md:max-w-[40rem]" />
        </div>
        <div className="card ">
          <p className="py-1 text-xl leading-loose text-center text-neutral-content md:text-2xl">
            Unlock your productivity potential.
            <br />
            Your Time. Your Way.
          </p>
        </div>
        <Card className={'bg-opacity-40'}>
          <article className="leading-loose prose text-center">
            A time management tool for tracking time spent on projects and
            tasks. Record each activity with a click of a button. Track personal
            progress anywhere at any time with a Designed for mobile-first
            approach.
          </article>
        </Card>
      </div>
    </>
  );
};

export default AboutUsPage;
