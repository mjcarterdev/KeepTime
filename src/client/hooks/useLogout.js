import { getLogout } from '../api/services';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const KEEPTIME = 'keeptime-session';

const useLogout = () => {
  const { setUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const {
    mutate: logoutOnSubmit,
    data: logoutData,
    error: logoutError,
    isLoading: logoutIsLoading,
  } = useMutation({
    mutationFn: getLogout,
    onError: () => {
      setUser({});
    },
    onSuccess: () => {
      queryClient.clear();
      setUser({});
    },
  });

  return {
    logoutOnSubmit,
    logoutData,
    logoutError,
    logoutIsLoading,
  };
};

export default useLogout;
