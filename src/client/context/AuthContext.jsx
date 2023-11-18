import { createContext, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage.js';

const KEEPTIME = 'keeptime-session';

const AuthContext = createContext({
  user: null,
  isLoading: false,
  error: null,
  setUser: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage(KEEPTIME);

  return (
    <AuthContext.Provider
      value={useMemo(() => ({ user, setUser }), [user, setUser])}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthContextProvider;
