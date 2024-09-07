import { X } from "lucide-react";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import SideMenu from "./SideMenu";
import { useState } from "react";
import { BsGlobe2 } from "react-icons/bs";
import { MdSearch } from "react-icons/md";
import LanguagesDropDown from "../DropDownMenus/LanguagesDropDown";

function NavBar() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isInputVisible, setInputVisible] = useState(
    (searchParams.get("filterRestName") && true) || false
  );

  function handleSearchNameChange(ev: React.ChangeEvent<HTMLInputElement>) {
    searchParams.set("filterRestName", ev.currentTarget.value);
    setSearchParams(searchParams);
  }

  const handleXClick = () => {
    setInputVisible(false);
    searchParams.delete("filterRestName");
    setSearchParams(searchParams);
  };

  return (
    <div className="relative z-50 opacity-90 font-rubik bg-greyNavbar text-white shadow-2xl before:content-[''] before:absolute before:inset-0 before:bg-transparent before:pointer-events-none before:shadow-[inset_0_10px_15px_-10px_rgba(0,0,0,0.8),inset_0_0_10px_rgba(0,0,0,0.3)]">
      {/* Mobile View */}
      <div className="flex items-center justify-between h-16 px-3 sm:hidden shadow-2xl ">
        {!isInputVisible && (
          <>
            <SideMenu />
            <Link to={"/"}>
              <img
                src="https://tabitisrael.co.il/assets/images/tabit_white_yellow_ribbon.svg?v=4_11_1"
                className="w-24"
              />
            </Link>
            <div className="flex gap-2 items-center">
              <div
                className="p-2 rounded-full border-2 border-greyBorder flex items-center justify-center cursor-pointer hover:text-gray-300 transition-all duration-700"
                onClick={() => setInputVisible(true)}
              >
                <MdSearch className="size-5 text-greenHamburger" />
              </div>
              <LanguagesDropDown />
            </div>
          </>
        )}
        {isInputVisible && (
          <div className="flex w-full">
            {isInputVisible && (
              <form
                className="flex justify-between py-1 px-4 items-center border-2 border-greyBorder w-full rounded-full"
                onSubmit={() =>
                  navigate(
                    `/restaurants?filterRestName=${
                      searchParams.get("filterRestName") || ""
                    }`
                  )
                }
              >
                <div className="flex gap-2">
                  <X
                    size={23}
                    className="text-greenHamburger cursor-pointer hover:text-gray-300 transition duration-200"
                    onClick={handleXClick}
                  />
                  <input
                    type="text"
                    placeholder="Restaurant search"
                    value={searchParams.get("filterRestName") || ""}
                    onChange={handleSearchNameChange}
                    className={`bg-transparent  border-none outline-none text-white placeholder-gray-400 `}
                    autoFocus
                  />
                </div>
                {searchParams.get("filterRestName") && (
                  <button type="submit" className="text-greenHamburger">
                    Search
                  </button>
                )}
              </form>
            )}
            <LanguagesDropDown />
          </div>
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden sm:block gap-5 px-[3em] py-4 shadow-2xl">
        <div className="flex flex-grow items-center justify-between flex-row text-center font-extrabold text-lg">
          <div>
            <NavLink to={"/"}>
              <img
                src="https://tabitisrael.co.il/assets/images/tabit_white_yellow_ribbon.svg?v=4_11_1"
                className="w-32"
              />
            </NavLink>
          </div>

          <div className="flex items-center gap-8 flex-row justify-center ">
            <NavLink
              to={"/book-a-table"}
              className={({ isActive }) =>
                isActive
                  ? `text-greenHamburger transition duration-200`
                  : "hover:text-gray-300 transition duration-200"
              }
            >
              Reserve a table
            </NavLink>
            <NavLink
              to={"/deliveries"}
              className={({ isActive }) =>
                isActive
                  ? `text-greenHamburger transition duration-200`
                  : "hover:text-gray-300 transition duration-200"
              }
            >
              Deliveries & Takeouts
            </NavLink>
            <NavLink
              to={"/restaurants"}
              className={({ isActive }) =>
                isActive
                  ? `text-greenHamburger transition duration-200`
                  : "hover:text-gray-300 transition duration-200"
              }
            >
              Restaurants
            </NavLink>
            <NavLink
              to={"/gift-it"}
              className={({ isActive }) =>
                isActive
                  ? `text-greenHamburger transition duration-200`
                  : "hover:text-gray-300 transition duration-200"
              }
            >
              Tabit Gift it
            </NavLink>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? `text-greenHamburger transition duration-200`
                  : "hover:text-gray-300 transition duration-200"
              }
            >
              Restaurant owner?
            </NavLink>
          </div>

          <div className="flex items-center w-72 justify-end">
            <div className="flex gap-2 items-center">
              {isInputVisible && (
                <form
                  className="flex  py-1 px-3 items-center border-2 border-greyBorder rounded-full"
                  onSubmit={() =>
                    navigate(
                      `/restaurants?filterRestName=${
                        searchParams.get("filterRestName") || ""
                      }`
                    )
                  }
                >
                  <X
                    size={23}
                    className="text-greenHamburger cursor-pointer hover:text-gray-300 transition duration-200"
                    onClick={handleXClick}
                  />
                  <input
                    type="text"
                    placeholder="Restaurant search"
                    value={searchParams.get("filterRestName") || ""}
                    onChange={handleSearchNameChange}
                    className={`bg-transparent border-none outline-none text-white font-normal placeholder-gray-400 ${
                      searchParams.get("filterRestName") ? "w-28" : "w-44"
                    }`}
                    autoFocus
                  />
                  {searchParams.get("filterRestName") && (
                    <button type="submit" className="text-greenHamburger">
                      Search
                    </button>
                  )}
                </form>
              )}
              {!isInputVisible && (
                <div
                  className="p-2 rounded-full border-2 border-greyBorder flex items-center justify-center cursor-pointer hover:text-gray-300"
                  onClick={() => setInputVisible(true)}
                >
                  <MdSearch className="size-5 text-greenHamburger" />
                </div>
              )}
              <LanguagesDropDown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
