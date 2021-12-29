import { API, REFRESH_TOKEN, TOKEN } from "./Constants";
import history from './History';
import { CheckToken } from "./UtilFunctions";

const customFetch = async (url, config = {}) => {
  if (!url.includes(API)) url = API + url;
  
  if (!CheckToken()) {
    return await fetch(url, config);
  }

  const token = localStorage.getItem(TOKEN);
  config['headers'] = {
    ...config.headers,
    Authorization: `Bearer ${token}`
  };

  let res = await fetch(url, config);

  if (res.status === 401) {
    const refresh_token = localStorage.getItem(REFRESH_TOKEN);

    const response = await fetch(`/api/token/refresh?token=${refresh_token}`);

    localStorage.removeItem(TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);

    if (response.status !== 200) {
      history.push("/login");
      return;
    }

    const data = await response.json();

    localStorage.setItem(TOKEN, data.access_token);
    localStorage.setItem(REFRESH_TOKEN, data.refresh_token);

    res = customFetch(url, config);
  }

  return res;
}

export default customFetch;