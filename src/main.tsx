import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/custom/ThemeProvider/themeProvider.tsx";
import { UserProvider } from "./context/UserContext.tsx";
import { ReservationProvider } from "./context/ReservationContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <UserProvider>
        <BrowserRouter>
          <ReservationProvider>
            <App />
          </ReservationProvider>
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  </StrictMode>
);
