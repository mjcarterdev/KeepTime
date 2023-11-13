import { useEffect } from 'react';
import NavBar from '../components/Navbar';
import { useLoaderData, useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const loader = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loader.authProvider.isAuth) {
      navigate('/');
    }
  }, [loader.authProvider.isAuth]);

  return (
    <>
      <NavBar authContext={loader.authProvider} location="Profile" />
      <div
        className={`flex pb-32 pt-24 flex-col flex-1 h-[100vh] w-full gap-2 p-4 overflow-y-scroll md:items-center scrollbar-hide md:scrollbar-default `}
      >
        <div>
          <p className="">{loader.authProvider.user?.name}</p>
          <p className="">{loader.authProvider.user?.email}</p>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
