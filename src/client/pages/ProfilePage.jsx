import { useEffect } from 'react';
import router from '../router';

const ProfilePage = ({ useLoader }) => {
  const { authContext } = useLoader();
  const { isAuth, user } = authContext.session();

  console.log('profile: ', user);

  const handleLogout = async () => {
    const res = await authContext.logout();
    if (!res.data.isAuthenticated) {
      router.navigate('/');
    }
  };

  useEffect(() => {
    if (!isAuth) {
      router.navigate('/');
    }
  }, [status]);

  return (
    <>
      <div className="h-[calc(100vh-4rem)] bg-base-100">
        <br />
        <h1>Protected</h1>
        <p>{JSON.stringify(user)}</p>
        <br />
        <button type="submit" onClick={() => handleLogout()} className="btn btn-primary">
          Sign out
        </button>
      </div>
    </>
  );
};

export default ProfilePage;
