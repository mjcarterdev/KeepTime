import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useQuery } from 'react-query';
import { getUserById } from '../../server/controllers/userController';

export const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  //   const data = useQuery(['user'], {
  //     queryFn: getUserById,
  //     onSuccess: (data) => {
  //       setUser(data);
  //     },
  //     onError: (error) => {
  //       console.log(error);
  //     },
  //   });
  //   console.log(`protected:`, user);
  if (!user) {
    navigate('/');
  }
  return children;
};
