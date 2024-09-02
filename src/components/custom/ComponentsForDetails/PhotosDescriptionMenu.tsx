import React, { useState } from "react";
import { IRestaurant } from "@/types/restaurant"; // Импорт типа IRestaurant
import { motion, AnimatePresence } from "framer-motion";

interface RestaurantDetailsProps {
  restaurant: IRestaurant;
}

const PhotosDescriptionMenu: React.FC<RestaurantDetailsProps> = ({
  restaurant,
}) => {
  const [activeSection, setActiveSection] = useState("menus");

  const renderSectionContent = () => {
    switch (activeSection) {
      case "menus":
        return (
          <ul className="text-gray-400 text-[1em] py-3">
            {restaurant.menus.map((menu, index) => (
              <li
                key={index}
                className="flex justify-between items-center py-2 "
              >
                <div className="flex items-center">
                  <a
                    href={menu.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-white text-[1em]"
                  >
                    <span
                      className="icon regular-menu"
                      style={{
                        backgroundImage:
                          'url("https://tabitisrael.co.il/assets/images/menu_offline.svg?v=4_11_2")',
                        width: "2.5em",
                        height: "2.5em",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        display: "inline-block",
                        marginRight: "8px",
                      }}
                    ></span>
                    <span>{menu.title}</span>
                  </a>
                </div>
                <span>&gt;</span>
              </li>
            ))}
          </ul>
        );

      case "about":
        return (
          <div className="flex justify-center max-w-4xl text-white text-[1em] py-3">
            {restaurant.longDescription}
          </div>
        );
      case "photos":
        return (
          <div className="grid grid-cols-3 gap-2 py-3">
            {restaurant?.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Photo ${index + 1}`}
                className="w-full h-auto"
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="text-white relative lg:pb-[5em]">
      <div className="flex justify-start border-b border-greyBorder relative">
        <div
          className={`absolute bottom-0 left-0 h-0.5 bg-greenButton transition-all duration-300 ease-in-out`}
          style={{
            width: `${
              activeSection === "menus"
                ? "80px"
                : activeSection === "about"
                ? "160px"
                : "100px"
            }`,
            transform: `translateX(${
              activeSection === "menus"
                ? "0"
                : activeSection === "about"
                ? "80px"
                : "240px"
            })`,
          }}
        />
        <button
          className={`py-3 px-4 relative ${
            activeSection === "menus" ? "text-greenButton" : ""
          }`}
          onClick={() => setActiveSection("menus")}
        >
          Menus
        </button>
        <button
          className={`py-3 px-4 relative ${
            activeSection === "about" ? "text-greenButton" : ""
          }`}
          onClick={() => setActiveSection("about")}
        >
          About restaurant
        </button>
        <button
          className={`py-3 px-4 relative ${
            activeSection === "photos" ? "text-greenButton" : ""
          }`}
          onClick={() => setActiveSection("photos")}
        >
          Photos
        </button>
      </div>

      <div className="p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            {renderSectionContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PhotosDescriptionMenu;
