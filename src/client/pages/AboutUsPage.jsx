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
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;
