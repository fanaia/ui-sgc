import axios from "axios";

const apiRetaguarda = axios.create({
  baseURL: process.env.REACT_APP_MS_RETAGUARDA,
});

apiRetaguarda.interceptors.request.use((config) => {
  const tokenJwt = localStorage.getItem("tokenJwt");
  if (tokenJwt) {
    config.headers.Authorization = `Bearer ${tokenJwt}`;
  }
  return config;
});

export default apiRetaguarda;
