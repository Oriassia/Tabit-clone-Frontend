import Footer from "@/components/costum/Footer/Footer";
import NavBar from "@/components/costum/NavBar/NavBar";
import { Outlet } from "react-router";

function MainLayout() {
  return (
    <>
      <div className="fixed z-10">
        <NavBar />
      </div>
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
