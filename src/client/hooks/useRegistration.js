import { postRegistration } from '../api/services';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useRegistration = () => {
  const { setUser, setErrorMessage } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const {
    mutate: registerOnSubmit,
    data: registerData,
    error: registerError,
    isLoading: registerIsLoading,
  } = useMutation({
    mutationFn: postRegistration,
    onError: (error) => {
      setErrorMessage(error.response.data.error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['projects']);
      setUser(data.data.user);
    },
  });

  return {
    registerOnSubmit,
    registerData,
    registerError,
    registerIsLoading,
  };
};

export default useRegistration;
