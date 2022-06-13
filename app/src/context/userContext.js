import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useAuth = () => {
  const auth = useContext(UserContext);
  return auth;
};

const user = {
  token: '',
  user: {}
};

const UserProvider = ({ children }) => {

  const [isAutenticated, setIsAutenticated] = useState(JSON.parse(window.localStorage.getItem('session')) || user);

  // eslint-disable-next-line no-shadow
  const login = ({ token, user }) => {
    setIsAutenticated({ token, user });
  };

  const logout = () => {
    window.localStorage.removeItem('session');
    setIsAutenticated({ token: '', user: {} });
  };

  // eslint-disable-next-line react/react-in-jsx-scope
  return <UserContext.Provider value={{
    isAutenticated,
    login,
    logout
  }}>{children}</UserContext.Provider>;
};

export default UserProvider;