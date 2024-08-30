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
    <div className="border-b border-greyBorder pb-3">
      <div
        className="flex items-center gap-6 cursor-pointer"
        onClick={toggleOpen}
      >
        <OpenIcon />
        <span>{currentlyOpen ? "Open" : "Closed"}</span>
        <span className="ml-2">{todayHours}</span>
      </div>
      {isOpen && (
        <div className="mt-3">
          <div className="flex gap-[5em]">
            {/* Столбец с днями недели */}
            <div className="flex flex-col">
              {restaurant.openingHours.map((hours, index) => (
                <span key={index}>
                  {capitalizeFirstLetter(Object.keys(hours)[0])}
                </span>
              ))}
            </div>
            {/* Столбец с часами работы */}
            <div className="flex flex-col">
              {restaurant.openingHours.map((hours, index) => (
                <span key={index}>{Object.values(hours)[0] || "Closed"}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpeningHours;
