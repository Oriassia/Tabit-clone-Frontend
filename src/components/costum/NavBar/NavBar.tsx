import { X } from "lucide-react";
import { Link } from "react-router-dom";
import SideMenu from "./SideMenu";
import { useState } from "react";
import { BsGlobe2 } from "react-icons/bs";
import { MdSearch } from "react-icons/md";

function NavBar() {
  const [isInputVisible, setInputVisible] = useState(false);

  return (
    <div className="flex items-center justify-between px-5 bg-greyNavbar text-white h-16 shadow-md">
      {/* Mobile View */}
      <div className="flex items-center justify-between w-full sm:hidden">
        {!isInputVisible ? (
          <>
            <SideMenu />
            <img
              src="https://tabitisrael.co.il/assets/images/tabit_white_yellow_ribbon.svg?v=4_11_1"
              className="w-20"
            />
            <div className="flex gap-2 items-center">
              <div
                className="p-[1px] rounded-full border-2 border-gray-500 flex items-center justify-center cursor-pointer hover:text-gray-300 transition duration-200"
                onClick={() => setInputVisible(true)}
              >
                <MdSearch className="size-6 text-greenHamburger" />
              </div>
              <BsGlobe2 className="size-7 text-gray-500 hover:text-gray-300 transition duration-200 cursor-pointer" />
            </div>
          </>
        ) : (
          <div className="flex items-center w-full">
            <MdSearch className="size-6 text-greenHamburger" />
            <input
              type="text"
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
      <div className="hidden sm:flex items-center justify-between w-full">
        <img
          src="https://tabitisrael.co.il/assets/images/tabit_white_yellow_ribbon.svg?v=4_11_1"
          className="w-20"
        />

        <div className="flex justify-center gap-8 font-semibold text-sm">
          <Link
            to={"/book-a-table"}
            className="hover:text-gray-300 transition duration-200"
          >
            Reserve a table
          </Link>
          <Link
            to={"/deliveries"}
            className="hover:text-gray-300 transition duration-200"
          >
            Deliveries & Takeouts
          </Link>
          <Link
            to={"/restaurants"}
            className="hover:text-gray-300 transition duration-200"
          >
            Restaurants
          </Link>
          <Link
            to={"/gift-it"}
            className="hover:text-gray-300 transition duration-200"
          >
            Tabit Gift it
          </Link>
          <Link
            to={"/"}
            className="hover:text-gray-300 transition duration-200"
          >
            Restaurant owner?
          </Link>
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
              className="p-[1px] rounded-full border-2 border-gray-500 flex items-center justify-center cursor-pointer hover:text-gray-300 transition duration-200"
              onClick={() => setInputVisible(true)}
            >
              <MdSearch className="size-6 text-greenHamburger" />
            </div>
            <BsGlobe2 className="size-7 text-gray-500 hover:text-gray-300 transition duration-200 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
