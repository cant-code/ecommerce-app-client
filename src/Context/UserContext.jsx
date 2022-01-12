import React, { useState, useCallback, useContext } from "react";

export const UserContext = React.createContext(undefined);

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const removeUser = () => setUser(null);
  const updateUser = (data) => setUser(data);

  const contextValue = {
    user,
    updateUser: useCallback((data) => updateUser(data), []),
    removeUser: useCallback(() => removeUser(), []),
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUserDetails = () => {
  const { user, updateUser, removeUser } = useContext(UserContext);
  return { user, updateUser, removeUser };
};

export default UserContextProvider;
