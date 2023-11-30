import { createContext, useEffect, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage.js';
// import { useQuery } from 'react-query';
// import { getUser } from '../api/services.js';

const KEEPTIME = 'keeptime-session';

const AuthContext = createContext({
  user: null,
});

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage(KEEPTIME);

  // const {
  //   data: user,
  //   isLoading: userIsLoading,
  //   isError: userIsError,
  // } = useQuery({
  //   queryKey: ['user'],
  //   queryFn: getUser,
  // });
  return (
    <AuthContext.Provider value={useMemo(() => ({ user, setUser }), [user])}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthContextProvider;
