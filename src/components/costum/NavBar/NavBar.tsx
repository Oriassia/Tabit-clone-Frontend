import { X } from "lucide-react";
import { Link } from "react-router-dom";
import SideMenu from "./SideMenu";
import { useState } from "react";
import { BsGlobe2 } from "react-icons/bs";
import { MdSearch } from "react-icons/md";

function NavBar() {
  const [isInputVisible, setInputVisible] = useState(false);

  return (
    <div className="opacity-90 font-rubik  w-full  flex items-center justify-between bg-greyNavbar text-white ">
      {/* Mobile View */}
      <div className="flex items-center justify-between w-full p-5 sm:hidden ">
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
      <div className="hidden sm:flex items-center justify-between w-[75em] p-5 container">
        <Link to={"/"}>
          <img
            src="https://tabitisrael.co.il/assets/images/tabit_white_yellow_ribbon.svg?v=4_11_1"
            className="w-32"
          />
        </Link>

        <div className="flex justify-center gap-8 font-extrabold text-lg">
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
