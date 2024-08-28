import { Outlet, Route, Routes } from "react-router";
import MainLayout from "./context/MainLayout";
import LandingPage from "./pages/LandingPage";
import DeliveriesPage from "./pages/DeliveriesPage";
import RestaurantsPage from "./pages/RestaurantsPage";
import BookATablePage from "./pages/BookATablePage";
import GiftItPage from "./pages/GiftItPage";
import RestaurantDetailsPage from "./pages/RestaurantDetailsPage";

function App() {
  return (
    <>
      <Routes>
        {/* routes WITH navbar & footer */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="deliveries" element={<DeliveriesPage />} />
          <Route path="restaurants" element={<RestaurantsPage />} />
          <Route path="gift-it" element={<GiftItPage />} />
          <Route
            path="restaurants/:restaurantId"
            element={<RestaurantDetailsPage />}
          />
        </Route>

        {/* routes WITH navbar ONLY */}
        <Route path="/" element={<Outlet />}>
          <Route path="book-a-table" element={<BookATablePage />} />
        </Route>

        {/* routes WITHOUT navbar & footer */}
        {/* <Route path="/" element={<Outlet />}></Route> */}
      </Routes>
    </>
  );
}

export default App;
