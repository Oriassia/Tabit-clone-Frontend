import React, { useState } from "react";
import { IRestaurant } from "@/types/restaurant"; // Убедитесь, что путь правильный
import OpenIcon from "../svg/OpenIcon"; // Предполагаем, что у вас есть компонент для иконки

interface OpeningHoursProps {
  restaurant: IRestaurant;
}

const OpeningHours: React.FC<OpeningHoursProps> = ({ restaurant }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Проверяем, существуют ли часы работы и есть ли хотя бы один элемент
  const hasOpeningHours =
    restaurant.openingHours && restaurant.openingHours.length > 0;

  // Получаем текущий день недели
  const today = hasOpeningHours
    ? (new Date()
        .toLocaleDateString("en-US", { weekday: "long" })
        .toLowerCase() as keyof (typeof restaurant.openingHours)[0])
    : null;

  // Получаем часы работы для текущего дня
  const todayHours =
    hasOpeningHours && today && restaurant.openingHours[0]
      ? restaurant.openingHours[0][today]
      : null;

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
        <span>{todayHours && todayHours !== "Closed" ? "Open" : "Closed"}</span>
        <span className="ml-2">
          {todayHours ? todayHours : "Closed for today"}
        </span>
      </div>
      {hasOpeningHours && restaurant.openingHours[0] && (
        <div className="mt-3">
          <ul className="text-gray-300">
            <li>Sunday: {restaurant.openingHours[0].sunday || "Closed"}</li>
            <li>Monday: {restaurant.openingHours[0].monday || "Closed"}</li>
            <li>Tuesday: {restaurant.openingHours[0].tuesday || "Closed"}</li>
            <li>
              Wednesday: {restaurant.openingHours[0].wednesday || "Closed"}
            </li>
            <li>Thursday: {restaurant.openingHours[0].thursday || "Closed"}</li>
            <li>Friday: {restaurant.openingHours[0].friday || "Closed"}</li>
            <li>Saturday: {restaurant.openingHours[0].saturday || "Closed"}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default OpeningHours;
