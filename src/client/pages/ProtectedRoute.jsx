import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { user, setUser } = useContext(AuthContext);

  return user ? children : <Navigate to={'/'} />;
};
