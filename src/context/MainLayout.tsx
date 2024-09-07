import Footer from "@/components/custom/Footer/Footer";
import NavBar from "@/components/custom/NavBar/NavBar";
import { Outlet } from "react-router";

function MainLayout() {
  return (
    <>
      <div className="fixed w-full z-50">
        <NavBar />
      </div>
      <main className="flex-grow ">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
