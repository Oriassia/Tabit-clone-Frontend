import { Outlet, Route, Routes } from "react-router";
import MainLayout from "./context/MainLayout";
import LandingPage from "./Pages/LandingPage";

function App() {
  return (
    <>
      <Routes>
        {/* routes WITH navbar & footer */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
        </Route>

        {/* routes WITHOUT navbar & footer */}
        <Route path="/" element={<Outlet />}>
          <Route path="???" element={<div>null</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
