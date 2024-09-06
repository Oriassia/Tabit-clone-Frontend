import { X } from "lucide-react";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import SideMenu from "./SideMenu";
import { useState } from "react";
import { BsGlobe2 } from "react-icons/bs";
import { MdSearch } from "react-icons/md";

function NavBar() {
  const [isInputVisible, setInputVisible] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

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
    <div className=" z-50 opacity-90 font-rubik bg-greyNavbar text-white">
      {/* Mobile View */}
      <div className="flex items-center justify-between p-3 sm:hidden shadow-2xl ">
        {!isInputVisible ? (
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
                className="p-1 rounded-full border-2 border-gray-500 flex items-center justify-center cursor-pointer hover:text-gray-300 transition duration-200"
                onClick={() => setInputVisible(true)}
              >
                <MdSearch className="size-5 text-greenHamburger" />
              </div>
              <BsGlobe2 className="size-7 text-gray-500 hover:text-gray-300 transition duration-200 cursor-pointer" />
            </div>
          </>
        ) : (
          <div className="flex items-center w-full">
            <MdSearch className="size-6 text-greenHamburger" />
            <input
              type="text"
              onKeyDown={(ev) => {
                if (ev.key === "Enter") {
                  navigate(
                    `/restaurants?filterRestName=${
                      searchParams.get("filterRestName") || ""
                    }`
                  );
                }
              }}
              placeholder="Restaurant search"
              value={searchParams.get("filterRestName") || ""}
              onChange={handleSearchNameChange}
              className="bg-transparent border-none outline-none text-white placeholder-gray-300 w-48"
              autoFocus
            />
            <X
              className="text-lg cursor-pointer hover:text-gray-300 transition duration-200"
              onClick={handleXClick}
            />
            <BsGlobe2 className="size-7 text-gray-500 ml-4 hover:text-gray-300 transition duration-200 cursor-pointer" />
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

          <div className="flex items-center gap-4 flex-row justify-center">
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

          <div className="flex items-center gap-4 w-72 justify-end">
            {isInputVisible && (
              <form
                className="flex py-2 px-2 items-center border-2 rounded-full "
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
                  className="bg-transparent border-none outline-none text-white placeholder-gray-400 "
                  autoFocus
                />
                {searchParams.get("filterRestName") && (
                  <button type="submit" className="text-greenHamburger">
                    Search
                  </button>
                )}
              </form>
            )}
            <div className="flex gap-2 items-center">
              {!isInputVisible && (
                <div
                  className="p-1 rounded-full border-2 border-gray-500 flex items-center justify-center cursor-pointer hover:text-gray-300 transition duration-200"
                  onClick={() => setInputVisible(true)}
                >
                  <MdSearch className="size-5 text-greenHamburger" />
                </div>
              )}
              <BsGlobe2 className="size-7 text-gray-500 hover:text-gray-300 transition duration-200 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
