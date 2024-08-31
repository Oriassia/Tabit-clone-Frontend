import React, { useState } from "react";
import { IOpeningHours, IRestaurant } from "@/types/restaurant"; // Убедитесь, что путь правильный
import OpenIcon from "../svg/OpenIcon"; // Предполагаем, что у вас есть компонент для иконки

interface OpeningHoursProps {
  restaurant: IRestaurant;
}

const OpeningHours: React.FC<OpeningHoursProps> = ({ restaurant }) => {
  const [isOpen, setIsOpen] = useState(false);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Получаем текущий день недели
  const today = new Date()
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase() as keyof IOpeningHours;

  // Получаем текущую дату и время
  const now = new Date();

  // Получаем часы работы для текущего дня
  const todayHours: string =
    (
      restaurant.openingHours.find((hours) => today in hours) as IOpeningHours
    )?.[today]?.toString() || "Closed";

  // Функция для проверки, открыт ли ресторан в данный момент
  const isCurrentlyOpen = (hours: string) => {
    const [openTime, closeTime] = hours.split(" - ").map((time) => {
      const [hours, minutes] = time.split(":").map(Number);
      const date = new Date(now);
      date.setHours(hours);
      date.setMinutes(minutes);
      return date;
    });

    return now >= openTime && now <= closeTime;
  };

  // Проверяем, открыт ли ресторан сейчас
  const currentlyOpen = todayHours !== "Closed" && isCurrentlyOpen(todayHours);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="border-b border-greyBorder font-rubik font-normal pb-3 ">
      <div
        className="flex  items-center text-[1em] cursor-pointer"
        onClick={toggleOpen}
      >
        <div className="flex items-center w-fit gap-6">
          <OpenIcon />
          <span className="text-[1em]">
            {currentlyOpen ? "Open" : "Closed"}
          </span>
        </div>
        <span className="flex-grow w-fit text-right ">{todayHours}</span>
      </div>
      {isOpen && (
        <div className="mt-3">
          <div className="flex w-full">
            {/* Столбец с днями недели */}
            <div className="flex flex-col text-[0.8em]">
              {restaurant.openingHours.map((hours, index) => (
                <span
                  key={index}
                  className={`px-1 pr-[7em] py-1 ${
                    index % 2 === 0 ? "bg-greyDarkBg" : "bg-greyBg"
                  }`}
                >
                  {capitalizeFirstLetter(Object.keys(hours)[0])}
                </span>
              ))}
            </div>
            {/* Столбец с часами работы */}
            <div className="flex flex-col flex-grow text-[0.8em]">
              {restaurant.openingHours.map((hours, index) => (
                <span
                  key={index}
                  className={`px-1 py-1 ${
                    index % 2 === 0 ? "bg-greyDarkBg" : "bg-greyBg"
                  } w-full`}
                >
                  {Object.values(hours)[0] || "Closed"}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpeningHours;
