import axios from "axios";

const apiRetaguarda = axios.create({
  baseURL: process.env.REACT_APP_MS_RETAGUARDA,
});

apiRetaguarda.interceptors.request.use((config) => {
  const tokenJwt = localStorage.getItem("tokenJwt");
  const contratoSocial = localStorage.getItem("contratoSocial");

  if (tokenJwt) {
    config.headers.Authorization = `Bearer ${tokenJwt}`;
  }
  if (contratoSocial) {
    config.headers.contratoSocial = contratoSocial;
  }
  return config;
});

export default apiRetaguarda;
