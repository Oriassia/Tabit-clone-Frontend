import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/custom/ThemeProvider/themeProvider.tsx";
import { LocationsProvider } from "./context/LocationsContext.tsx";
import { ReservationProvider } from "./context/ReservationContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <LocationsProvider>
          <ReservationProvider>
            <App />
          </ReservationProvider>
        </LocationsProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
