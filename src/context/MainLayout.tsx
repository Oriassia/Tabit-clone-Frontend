import Footer from "@/components/costum/Footer/Footer";
import NavBar from "@/components/costum/NavBar/NavBar";
import { Outlet } from "react-router";

function MainLayout() {
  return (
    <>
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
