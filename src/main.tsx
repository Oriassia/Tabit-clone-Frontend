import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./components/costum/ThemeProvider/themeProvider.tsx";
import { UserProvider } from "./context/UserContext.tsx";

// const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <QueryClientProvider client={queryClient}> */}
    <ThemeProvider>
      <UserProvider>
        <BrowserRouter>
          {/* <RestaurantsProvider> */}
          <App />
          {/* </RestaurantsProvider> */}
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
    {/* </QueryClientProvider> */}
  </StrictMode>
);
