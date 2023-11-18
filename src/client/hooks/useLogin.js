import { postLogin } from '../api/services';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useLogin = () => {
  const { setUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // const registerMutation = useMutation({
  //   mutationFn: postRegistration,
  //   onError: (error) => {
  //     console.log(error);
  //   },
  //   onSuccess: (data) => {
  //     queryClient.clear();
  //     addUser(data.data.user);
  //   },
  // });

  const {
    mutate: loginOnSubmit,
    data: loginData,
    error: loginError,
    isLoading: loginIsLoading,
  } = useMutation({
    mutationFn: postLogin,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data.data);
      queryClient.invalidateQueries(['projects']);
      setUser(data.data.user);
    },
  });

  return {
    loginOnSubmit,
    loginData,
    loginError,
    loginIsLoading,
  };
};

export default useLogin;
