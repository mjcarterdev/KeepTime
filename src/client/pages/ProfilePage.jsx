import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserProfile, logout } from '../api/services.js';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { isLoading, error, data } = useQuery(['profile'], getUserProfile);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(logout, {
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['profile'] });
      navigate('/');
    },
  });

  const handleLogout = () => mutation.mutate();

  if (error) {
    return <p>Error {error}</p>;
  }
  return (
    <>
      <div className="h-[calc(100vh-4rem)] bg-base-100">
        <br />
        {isLoading ? <p>isLoading...</p> : <p>{JSON.stringify(data?.data)}</p>}
        <br />
        <button className={'btn btn-primary'} onClick={() => handleLogout()}>
          Logout
        </button>
      </div>
    </>
  );
};

export default ProfilePage;
