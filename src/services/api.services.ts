import axios from "axios";

const baseURLHolder =
  import.meta.env.VITE_ENV === "development" // Use Vite's `import.meta.env`
    ? import.meta.env.VITE_DEV_API_BASE_URL
    : import.meta.env.VITE_PROD_API_BASE_URL;

const api = axios.create({
<<<<<<< HEAD
  baseURL: "https://tabit-clone-back-elad.vercel.app/api",
=======
  baseURL: baseURLHolder,
  withCredentials: true,
>>>>>>> 69fa665a4c1cfbff0f0ab3369726d4eba4cc17c4
});

export default api;
