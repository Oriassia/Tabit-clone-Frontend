import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RestaurantsProvider from "./context/RestaurantsContext.tsx";
import { ThemeProvider } from "./components/costum/ThemeProvider/themeProvider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
       <BrowserRouter>
         <RestaurantsProvider>
        <App />
          </RestaurantsProvider>
      </BrowserRouter>
        </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
