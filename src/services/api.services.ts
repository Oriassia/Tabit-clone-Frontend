import axios from "axios";

const baseURLHolder =
  import.meta.env.VITE_ENV === "development"
    ? import.meta.env.VITE_DEV_API_BASE_URL
    : import.meta.env.VITE_PROD_API_BASE_URL;

const api = axios.create({
  baseURL: baseURLHolder, // Use Vite's `import.meta.env`
  withCredentials: true,
});

export default api;
