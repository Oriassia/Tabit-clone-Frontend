import axios from "axios";
axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: "https://tabit-clone-back-elad.vercel.app/api",
});

export default api;
