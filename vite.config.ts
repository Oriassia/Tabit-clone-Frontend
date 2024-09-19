import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
<<<<<<< HEAD
    outDir: "../Babit-clone-Backend/public",
=======
    outDir: "./dist",
>>>>>>> 69fa665a4c1cfbff0f0ab3369726d4eba4cc17c4
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000, // Set the limit to a higher value (in kB)
  },
});
