import axios from "axios";
axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: "https://tabit-clone-api.vercel.app/api",
});

export default api;
