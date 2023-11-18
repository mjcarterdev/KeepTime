import { postRegistration } from '../api/services';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useRegistration = () => {
  const { setUser } = useContext(AuthContext);

  const {
    mutate: registerOnSubmit,
    data: registerData,
    error: registerError,
    isLoading: registerIsLoading,
  } = useMutation({
    mutationFn: postRegistration,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data.data);
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
