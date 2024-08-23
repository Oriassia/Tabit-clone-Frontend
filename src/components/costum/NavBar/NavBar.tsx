import { Globe, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import SideMenu from "./SideMenu";
import { useState } from "react";

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
            ></img>
            {/* <div title="Logo" className="text-3xl font-semibold">
              tabit
            </div> */}
            <div className="flex gap-4 items-center">
              <div
                className="p-2 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer hover:text-gray-300 transition duration-200"
                onClick={() => setInputVisible(true)}
              >
                <Search className="text-lg" />
              </div>
              <Globe className="hover:text-gray-300 transition duration-200 cursor-pointer" />
            </div>
          </>
        ) : (
          <div className="flex items-center w-full">
            <Search className="text-lg mr-2" />
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
            <Globe className="ml-4 hover:text-gray-300 transition duration-200 cursor-pointer" />
          </div>
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden sm:flex items-center justify-between w-full">
        <img
          src="https://tabitisrael.co.il/assets/images/tabit_white_yellow_ribbon.svg?v=4_11_1"
          className="w-20"
        ></img>

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
          <div
            className="p-2 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer hover:text-gray-300 transition duration-200"
            onClick={() => setInputVisible(!isInputVisible)}
          >
            <Search className="text-lg" />
          </div>
          <Globe className="hover:text-gray-300 transition duration-200 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
