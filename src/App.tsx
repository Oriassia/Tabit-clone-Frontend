import { Route, Routes } from "react-router";
import MainLayout from "./context/MainLayout";
import LandingPage from "./Pages/LandingPage";
import DeliveriesPage from "./Pages/DeliveriesPage";
import RestaurantsPage from "./Pages/RestaurantsPage";
import BookATablePage from "./Pages/BookATablePage";

function App() {
  return (
    <>
      <Routes>
        {/* routes WITH navbar & footer */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/book-a-table" element={<BookATablePage />} />
          <Route path="/deliveries" element={<DeliveriesPage />} />
          <Route path="/restaurants" element={<RestaurantsPage />} />
          <Route path="/gift-it" element={<RestaurantsPage />} />
        </Route>

        {/* routes WITHOUT navbar & footer */}
        {/* <Route path="/" element={<Outlet />}>
          <Route path="???" element={<div>null</div>} />
        </Route> */}
      </Routes>
    </>
  );
}

export default App;
