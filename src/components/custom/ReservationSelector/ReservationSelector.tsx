import { useUserContext } from "@/context/UserContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { MdMyLocation } from "react-icons/md";

export interface IReservationInput {
  dayName: string;
  dateDayNumber: string;
  time: string;
  guests: number;
  area: string;
}

export interface ReservationSelectorProps {
  reservationInputData: IReservationInput;
  onPartySizeChange: (newSize: number) => void;
  onDateChange: (newDate: Date) => void;
  onTimeChange: (newTime: string) => void;
}

export function ReservationSelector({
  reservationInputData,
  onPartySizeChange,
  onDateChange,
  onTimeChange,
}: ReservationSelectorProps) {
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);

  useEffect(() => {
    // Generate dates from today until the next 30 days
    const today = new Date();
    const dates: Date[] = [];

    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      dates.push(date);
    }

    setAvailableDates(dates);
  }, []);

  useEffect(() => {
    // Generate time options based on selected date
    const times: string[] = [];
    const now = new Date();

    const isToday =
      reservationInputData.dateDayNumber ===
      now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
      });

    let startHour = 8;
    let startMinute = 0;

    if (isToday && now.getHours() >= 8) {
      // Start time should be one hour ahead of the current time
      const nextAvailableTime = new Date(now.getTime() + 60 * 60 * 1000);
      startHour = nextAvailableTime.getHours();
      startMinute = nextAvailableTime.getMinutes() < 30 ? 30 : 0;
    }

    for (let hour = startHour; hour <= 23; hour++) {
      for (let minute = startMinute; minute < 60; minute += 30) {
        times.push(
          `${hour.toString().padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")}`
        );
      }
      startMinute = 0; // Reset startMinute after the first hour
    }

    setAvailableTimes(times);
  }, [reservationInputData.dateDayNumber]);

  const formatDate = (date: Date) => {
    const dayName = date.toLocaleDateString("en-GB", { weekday: "long" });
    const dayNumber = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
    });
    return { dayName, dayNumber };
  };

  return (
    <div className="flex border-2 rounded-full font-bold font-rubik text-white border-greenButton min-w-[350px] lg:min-w-[450px] bg-greenBg ">
      {/* Date Selection */}
      <div className="flex flex-col items-center px-[30px] lg:px-[40px] py-[0.5em] lg:text-[19px] text-[15px] border-r-2 border-greenButton">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none focus:ring-0">
            <p className="text-[1em] font-normal">
              {reservationInputData.dayName}
            </p>
            <p className="lg:w-[4em]">{reservationInputData.dateDayNumber}</p>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-greyDropDownMenu border-none text-white p-0 rounded-[1%] font-rubik min-w-[180px] max-h-48 overflow-y-auto"
            style={{
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // Internet Explorer and Edge
            }}
          >
            {availableDates.map((date) => {
              const { dayName, dayNumber } = formatDate(date);
              return (
                <DropdownMenuItem
                  key={dayNumber}
                  className={`hover:bg-greyHoverDropDownMenu focus:outline-none focus:ring-0 rounded-none cursor-pointer px-4 py-3 ${
                    dayNumber === reservationInputData.dateDayNumber
                      ? "bg-greyHoverDropDownMenu"
                      : ""
                  }`}
                  onClick={() => {
                    onDateChange(date);
                    setAvailableTimes([]);
                  }}
                >
                  <p>{`${dayName} - ${dayNumber}`}</p>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Time Selection */}
      <div className="flex flex-col items-center lg:text-[19px] px-[30px] lg:px-[45px] py-[0.5em] border-r-2 border-greenButton">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none focus:ring-0">
            <p className="text-[1em] font-normal">Hour</p>
            <p>{reservationInputData.time}</p>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-greyDropDownMenu border-none text-white p-0 rounded-[1%] font-rubik min-w-[180px] max-h-48 overflow-y-auto"
            style={{
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // Internet Explorer and Edge
            }}
          >
            {availableTimes.map((time) => (
              <DropdownMenuItem
                key={time}
                className={`hover:bg-greyHoverDropDownMenu focus:outline-none focus:ring-0 rounded-none cursor-pointer px-4 py-3 ${
                  time === reservationInputData.time
                    ? "bg-greyHoverDropDownMenu"
                    : ""
                }`}
                onClick={() => onTimeChange(time)}
              >
                <p>{time}</p>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Guests Selection */}
      <div className="flex flex-col items-center justify-center lg:text-[19px] px-[30px] lg:px-[40px] py-[0.5em]">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none focus:ring-0">
            <p className="text-[1em] font-normal">Guests</p>
            <p>{reservationInputData.guests}</p>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-greyDropDownMenu border-none text-white p-0 rounded-[1%] font-rubik min-w-[180px] max-h-48 overflow-y-auto"
            style={{
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // Internet Explorer and Edge
            }}
          >
            <DropdownMenuItem className="rounded-none font-bold px-4 py-0 pb-4 select-none">
              How Many Guests?
            </DropdownMenuItem>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((guestNum) => (
              <DropdownMenuItem
                key={guestNum}
                className={`hover:bg-greyHoverDropDownMenu focus:outline-none focus:ring-0 hover:border-none rounded-none cursor-pointer px-4 py-3 ${
                  guestNum === reservationInputData.guests
                    ? "bg-greyHoverDropDownMenu"
                    : ""
                }`}
                onClick={() => onPartySizeChange(guestNum)}
              >
                <p>{guestNum}</p>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export function AreaDropdown({
  area,
  onAreaChange,
  onAddNewAddress,
}: {
  area: string;
  onAreaChange: (newArea: string) => void;
  onAddNewAddress: () => void;
}) {
  const { usersLocation } = useUserContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none focus:ring-0 flex items-center gap-2 pb-[2em]">
        <GoDotFill className="text-greenButton items-center text-[19px]" />
        <span className="font-bold font-rubik text-white text-[19px]">
          {area}
        </span>
        <span className="border items-center flex border-greenBorderForIcon bg-transparent dark:hover:bg-transparent dark:bg-transparent p-0 px-[1.5em] h-[2.9em] hover:bg-transparent rounded-full">
          <MdMyLocation className="size-7 text-white " />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-greyDropDownMenu border-none text-white p-0 rounded-[1%] font-rubik min-w-[250px] max-h-48 overflow-y-auto relative"
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // Internet Explorer and Edge
        }}
      >
        <DropdownMenuItem
          className="hover:bg-greyHoverDropDownMenu cursor-pointer px-[0.6em] py-[0.7em]"
          onClick={() => onAreaChange("Around me")}
        >
          <DropdownMenuLabel className="font-thin">
            {usersLocation ? "Around me" : "Actual location unavailable"}
          </DropdownMenuLabel>
        </DropdownMenuItem>
        {[
          "Tel Aviv-Jaffa area",
          "Jerusalem area",
          "Haifa area",
          "Center",
          "North",
          "South",
        ].map((location) => (
          <DropdownMenuItem
            key={location}
            className="hover:bg-greyHoverDropDownMenu cursor-pointer px-[0.6em] py-[0.7em]"
            onClick={() => onAreaChange(location)}
          >
            <DropdownMenuLabel className="font-thin">
              {location}
            </DropdownMenuLabel>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          className="bg-greenButton flex gap-3 justify-center hover:bg-greenButtonDark text-center py-3 font-thin text-[1em] text-white cursor-pointer sticky bottom-0  font-rubik"
          onClick={onAddNewAddress}
        >
          <FaPlus />
          Add a new address
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
