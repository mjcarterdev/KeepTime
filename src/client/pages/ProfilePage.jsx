import { useContext, useEffect } from 'react';
import NavBar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [isAuth]);

  return (
    <>
      <NavBar location="Profile" />
      <div
        className={`flex pb-32 pt-24 flex-col flex-1 h-[100vh] w-full gap-2 p-4 overflow-y-scroll md:items-center scrollbar-hide md:scrollbar-default `}
      >
        <div>
          <p className="">{user.name}</p>
          <p className="">{user.email}</p>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
