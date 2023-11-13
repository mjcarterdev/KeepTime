import NavBar from '../components/Navbar';
import { useLoaderData } from 'react-router-dom';

const AboutUsPage = () => {
  const loader = useLoaderData();
  return (
    <>
      <NavBar authContext={loader.authProvider} location="About Us" />
      <div
        className={`flex pb-32 pt-24 flex-col flex-1 h-[100vh] w-full gap-2 p-4 overflow-y-scroll md:items-center scrollbar-hide md:scrollbar-default `}
      >
        <div>
          <p>About Us Page</p>

          <h2>Contribution Attribute</h2>
          <div>
            <a href="https://www.freepik.com/free-photo/vivid-blurred-colorful-wallpaper-background_18137267.htm#query=glassmorphism%20background&position=14&from_view=search&track=ais">
              Background Image by user3802032
            </a>{' '}
            on Freepik
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;
