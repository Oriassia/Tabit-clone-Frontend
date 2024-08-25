import { Route, Routes } from "react-router";
import MainLayout from "./context/MainLayout";
import LandingPage from "./pages/LandingPage";
import DeliveriesPage from "./pages/DeliveriesPage";
import RestaurantsPage from "./pages/RestaurantsPage";
import BookATablePage from "./pages/BookATablePage";
import GiftItPage from "./pages/GiftItPage";
import { useQuery } from "@tanstack/react-query";
import api from "./services/api.services";

function App() {
  const restaurantsQuery = useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => {
      const response = await api.get("/restaurants");
      return response.data; // Make sure to return the data
    },
  });

  if (restaurantsQuery.isSuccess) console.log(restaurantsQuery.data);
  return (
    <>
      <Routes>
        {/* routes WITH navbar & footer */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/book-a-table" element={<BookATablePage />} />
          <Route path="/deliveries" element={<DeliveriesPage />} />
          <Route path="/restaurants" element={<RestaurantsPage />} />
          <Route path="/gift-it" element={<GiftItPage />} />
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
