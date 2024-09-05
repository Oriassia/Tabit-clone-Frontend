import { X } from "lucide-react";
import { Link, NavLink, useSearchParams } from "react-router-dom";
import SideMenu from "./SideMenu";
import { useState } from "react";
import { BsGlobe2 } from "react-icons/bs";
import { MdSearch } from "react-icons/md";

function NavBar() {
  const [isInputVisible, setInputVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // function handleSearchNameChange(ev:eve)

  return (
    <div className=" opacity-90 font-rubik w-full items-center  bg-greyNavbar text-white">
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
              // value={searchParams.get("searchName") || ""}
              // onChange={() => handleSearchNameChange(ev)}
              placeholder="Restaurant search"
              className="flex-grow bg-transparent border-none outline-none text-white placeholder-gray-300"
              autoFocus
            />
            <X
              className="text-lg cursor-pointer hover:text-gray-300 transition duration-200"
              onClick={() => setInputVisible(false)}
            />
            <BsGlobe2 className="size-7 text-gray-500 ml-4 hover:text-gray-300 transition duration-200 cursor-pointer" />
          </div>
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden sm:flex items-center justify-between px-[3em] py-3 shadow-2xl">
        <NavLink to={"/"}>
          <img
            src="https://tabitisrael.co.il/assets/images/tabit_white_yellow_ribbon.svg?v=4_11_1"
            className="w-32"
          />
        </NavLink>

        <div className="flex justify-center gap-8 font-extrabold text-lg">
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

        <div className="flex items-center gap-4">
          {isInputVisible && (
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Restaurant search"
                className="bg-transparent border-none outline-none text-white placeholder-gray-300 w-48"
                autoFocus
              />
              <X
                className="absolute right-0 text-lg cursor-pointer hover:text-gray-300 transition duration-200"
                onClick={() => setInputVisible(false)}
              />
            </div>
          )}
          <div className="flex gap-2 items-center">
            <div
              className="p-1 rounded-full border-2 border-gray-500 flex items-center justify-center cursor-pointer hover:text-gray-300 transition duration-200"
              onClick={() => setInputVisible(true)}
            >
              <MdSearch className="size-5 text-greenHamburger" />
            </div>
            <BsGlobe2 className="size-7 text-gray-500 hover:text-gray-300 transition duration-200 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
