import React, { useState, useEffect, useContext } from "react";
import Keycloak from 'keycloak-js';
import PropTypes from "prop-types";

export const UserContext = React.createContext(undefined);

export const keycloak = new Keycloak({
  url: 'http://localhost:8900/',
  realm: 'ecommerce',
  clientId: 'ecommerce-ui'
});

export let loggedIn = false;

const UserContextProvider = ({ children }) => {

  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    const initKeycloak = async () => {
      try {
        const authenticated = await keycloak.init({ onLoad: 'check-sso' });
        console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
        setLoginStatus(authenticated);
        loggedIn = authenticated;
      } catch (error) {
        console.error('Failed to initialize adapter:', error);
      }
    };

    initKeycloak();
  }, []);

  const contextValue = {
    keycloak,
    loginStatus
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.elementType
}

export const useUserDetails = () => {
  const { keycloak, loginStatus } = useContext(UserContext);
  return { keycloak, loginStatus };
};

export default UserContextProvider;
