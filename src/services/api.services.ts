import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Use Vite's `import.meta.env`
  withCredentials: true,
});

export default api;
