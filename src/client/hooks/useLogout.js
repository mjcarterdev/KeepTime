import { getLogout } from '../api/services';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const KEEPTIME = 'keeptime-session';

const useLogout = () => {
  const { removeLocalStorageItem } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const {
    mutate: logoutOnSubmit,
    data: logoutData,
    error: logoutError,
    isLoading: logoutIsLoading,
  } = useMutation({
    mutationFn: getLogout,
    onError: () => {
      removeLocalStorageItem(KEEPTIME);
    },
    onSuccess: () => {
      queryClient.clear();
      removeLocalStorageItem(KEEPTIME);
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
