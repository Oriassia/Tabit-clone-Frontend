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
import CardDetails from "./pages/CardDetails";
import RedeemCardPage from "./pages/RedeemGiftCard";

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
            <Route path="redeem-card/:cardId" element={<RedeemCardPage />} />
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
        <Route
          path="/not-found"
          element={
            <div className="flex justify-center items-center h-screen">
              <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
            </div>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
