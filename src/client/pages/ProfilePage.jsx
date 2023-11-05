import { useEffect } from 'react';
import router from '../router';
import PageTitle from '../components/PageTitle';
import NavBar from '../components/Navbar';

const ProfilePage = ({ useLoader }) => {
  const { authContext } = useLoader();
  const { isAuth, user } = authContext.session();

  useEffect(() => {
    if (!isAuth) {
      router.navigate('/');
    }
  }, [isAuth]);

  return (
    <>
      <NavBar authContext={authContext} />
      <div className="h-[calc(100vh-4rem)] bg-base-100 flex flex-col items-center p-2">
        <br />
        <PageTitle title={'Profile Page'} />
        <div>
          <p className="">{user?.name}</p>
          <p className="">{user?.email}</p>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
