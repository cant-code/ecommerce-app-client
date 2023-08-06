import { keycloak, loggedIn } from "../Context/UserContext";
import { API } from "./Constants";

const customFetch = async (url, config = {}) => {

  if (!url.includes(API)) url = API + url;

  if (!loggedIn) {
    return await fetch(url, config);
  }

  config['headers'] = {
    ...config.headers,
    Authorization: `Bearer ${keycloak.token}`
  };

  let res = await fetch(url, config);

  if (res.status === 401) {
    try {
      const refreshed = await keycloak.updateToken(5);
      console.log(refreshed ? 'Token was refreshed' : 'Token is still valid');
    } catch (error) {
      console.error('Failed to refresh the token:', error);
    }

    res = customFetch(url, config);
  }

  return res;
}

export default customFetch;