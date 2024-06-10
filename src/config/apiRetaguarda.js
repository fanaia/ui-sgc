import axios from "axios";

const apiRetaguarda = axios.create({
  baseURL: process.env.REACT_APP_MS_RETAGUARDA,
});

apiRetaguarda.interceptors.request.use((config) => {
  const tokenJwt = localStorage.getItem("tokenJwt");
  const identificador = localStorage.getItem("identificador");

  if (tokenJwt) {
    config.headers.Authorization = `Bearer ${tokenJwt}`;
  }
  if (identificador) {
    config.headers.identificador = identificador;
  }
  return config;
});

export default apiRetaguarda;
