import { Globe, Search } from "lucide-react";
import { Link } from "react-router-dom";
import SideMenu from "./SideMenu";

function NavBar() {
  return (
    <>
      <div className="flex px-5 gap-5 bg-greyNavbar">
        <SideMenu />
        <div title="Logo" className="text-3xl">
          tabit
        </div>
        <div title="Navigation" className="flex gap-6">
          <Link to={"/book-a-table"}>Reserve a table</Link>
          <Link to={"/deliveries"}>Deliveries & Takeouts</Link>
          <Link to={"/restaurants"}>Restaurants</Link>
          <Link to={"/gift-it"}>Tabit Gift it</Link>
          <Link to={"/"}>Restaurant owner?</Link>
        </div>
        <div title="Search&lang" className="flex gap-3">
          <Search />
          <Globe />
        </div>
      </div>
    </>
  );
}

export default NavBar;
