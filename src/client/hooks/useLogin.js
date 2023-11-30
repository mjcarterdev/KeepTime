import { postLogin } from '../api/services';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useLogin = () => {
  const { setErrorMessage, setUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const {
    mutate: loginOnSubmit,
    data: loginData,
    error: loginError,
    isLoading: loginIsLoading,
  } = useMutation({
    mutationFn: postLogin,
    onError: (error) => {
      setErrorMessage(error.response.data.error);
    },
    onSuccess: (data) => {
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
