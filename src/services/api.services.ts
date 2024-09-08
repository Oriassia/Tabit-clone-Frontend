import axios from "axios";
axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL:
    process.env.ENVIRONMENT === "production"
      ? "https://tabit-clone-api.vercel.app/api"
      : "http://localhost:3000",
});

export default api;
