import axios from "axios";

const apiRetaguarda = axios.create({
  baseURL: "http://192.168.18.13:3010/api",
  // baseURL: "http://127.0.0.1:3010/api",
});

apiRetaguarda.interceptors.request.use((config) => {
  const tokenJwt = localStorage.getItem("tokenJwt");
  if (tokenJwt) {
    config.headers.Authorization = `Bearer ${tokenJwt}`;
  }
  return config;
});

export default apiRetaguarda;
