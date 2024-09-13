import { Outlet, Route, Routes } from "react-router";
import MainLayout from "./context/MainLayout";
import LandingPage from "./pages/LandingPage";
import DeliveriesPage from "./pages/DeliveriesPage";
import RestaurantsPage from "./pages/RestaurantsPage";
import BookATablePage from "./pages/BookATablePage";
import GiftItPage from "./pages/GiftItPage";
import RestaurantDetailsPage from "./pages/RestaurantDetailsPage";
import CreateReservation from "./pages/CreateReservation";
import ReservationDetailsPage from "./pages/ReservationDetailsPage";

import InnerFirstGiftCardPage from "./pages/InnerFirstGiftCardPage";
import NewRestaurants from "./pages/NewRestaurantsPage";
import NearRestaurants from "./pages/NearRestaurants";
import RedeemGiftCard from "./pages/CardDetails";
import CardDetails from "./pages/CardDetails";

function App() {
  return (
    <>
      <Routes>
        {/* Routes WITH navbar & footer */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="deliveries" element={<DeliveriesPage />} />
          <Route path="gift-it" element={<GiftItPage />} />
          <Route
            path="restaurants/:restaurantId"
            element={<RestaurantDetailsPage />}
          />
          <Route path="/newRestaurants" element={<NewRestaurants />} />
          <Route path="/nearRestaurants" element={<NearRestaurants />} />
        </Route>

        {/* Routes WITHOUT navbar & footer */}
        <Route path="/" element={<Outlet />}>
          <Route path="book-a-table" element={<BookATablePage />} />
          <Route path="restaurants" element={<RestaurantsPage />} />
          <Route path="gift-cards">
            <Route
              path="create-card/:restaurantId"
              element={<InnerFirstGiftCardPage />}
            />
            <Route path="card-details" element={<CardDetails />} />
            <Route path="redeem-card" element={<RedeemGiftCard />} />
          </Route>
        </Route>

        {/* Routes wrapped with ReservationProvider */}
        <Route path="/online-reservations" element={<Outlet />}>
          <Route index element={<CreateReservation />} />
          <Route
            path="reservation-details"
            element={<ReservationDetailsPage />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
