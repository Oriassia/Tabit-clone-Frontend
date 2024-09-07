import React, { useRef, useState } from "react";
import { IOpeningHours, IRestaurant } from "@/types/restaurant";
import OpenIcon from "../svg/OpenIcon";
import { IoIosArrowDown } from "react-icons/io";

interface OpeningHoursProps {
  restaurant: IRestaurant;
}

const OpeningHours: React.FC<OpeningHoursProps> = ({ restaurant }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
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
      restaurant.openingHours?.find((hours) => today in hours) as IOpeningHours
    )?.[today]?.toString() || "Closed";

  // Функция для проверки, открыт ли ресторан в данный момент
  const isCurrentlyOpen = (hours: string) => {
    if (!hours || hours === "Closed") {
      return false; // Если ресторан закрыт или часы не указаны, возвращаем false
    }

    const [openTimeStr, closeTimeStr] = hours
      .split("-")
      .map((time) => time.trim());

    if (!openTimeStr || !closeTimeStr) {
      return false; // Защита от ошибок, если формат данных не правильный
    }

    const [openHour, openMinute] = openTimeStr.split(":").map(Number);
    const [closeHour, closeMinute] = closeTimeStr.split(":").map(Number);

    const openTime = new Date(now);
    openTime.setHours(openHour);
    openTime.setMinutes(openMinute);
    openTime.setSeconds(0);
    openTime.setMilliseconds(0);

    let closeTime = new Date(now);
    closeTime.setHours(closeHour);
    closeTime.setMinutes(closeMinute);
    closeTime.setSeconds(0);
    closeTime.setMilliseconds(0);

    // Если время закрытия раньше времени открытия, предполагаем, что закрытие на следующий день
    if (closeTime <= openTime) {
      closeTime.setDate(closeTime.getDate() + 1);
    }

    return now >= openTime && now <= closeTime;
  };

  // Проверяем, открыт ли ресторан сейчас
  const currentlyOpen = todayHours !== "Closed" && isCurrentlyOpen(todayHours);

  return (
    <div className="border-b border-greyBorder font-rubik font-normal pb-3">
      <div
        className="flex items-center text-[1em]  cursor-pointer"
        onClick={toggleOpen}
      >
        <div className="flex items-center gap-6">
          <OpenIcon />
          <div className="flex items-center gap-1">
            <span className="text-[1em]">
              {currentlyOpen ? "Open" : "Closed"}
            </span>
            <IoIosArrowDown
              className={`transform transition-transform duration-300 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
        </div>
        <span className="w-full text-right pr-[1em]">{todayHours}</span>
      </div>
      <div
        ref={contentRef}
        className={`overflow-hidden transition-height duration-500 ease-in-out`}
        style={{
          height:
            isOpen && contentRef.current
              ? `${contentRef.current.scrollHeight}px`
              : "0px",
        }}
      >
        <div className="mt-3">
          <div className="flex w-full">
            {/* Столбец с днями недели */}
            <div className="flex flex-col text-[0.8em]">
              {restaurant.openingHours?.map((hours, index) => (
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
              {restaurant.openingHours?.map((hours, index) => {
                return (
                  <span
                    key={index}
                    className={`px-1 py-1 ${
                      index % 2 === 0 ? "bg-greyDarkBg" : "bg-greyBg"
                    } w-full`}
                  >
                    {Object.values(hours)[0] || "Closed"}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpeningHours;
