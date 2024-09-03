import {
  formatDate,
  generate30Days,
  getAvailableTimes,
} from "@/services/timefunctions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";

export interface IReservationInput {
  dayName: string;
  dateDayNumber: string;
  time: string;
  guests: number;
  area: string;
}

export interface ReservationSelectorProps {
  onDateChange: (newDate: Date) => void;
  updateSearchParams: (title: string, value: string) => void;
  searchParams: URLSearchParams;
}

export function ReservationSelector({
  onDateChange,
  updateSearchParams,
  searchParams,
}: ReservationSelectorProps) {
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);

  useEffect(() => {
    setAvailableDates(generate30Days());
  }, []);

  useEffect(() => {
    setAvailableTimes(getAvailableTimes(searchParams.get("dateDayNumber")));
  }, [searchParams.get("dateDayNumber")]);

  return (
    <>
      <div className="grid grid-cols-1 w-full border-2 rounded-[35px] font-bold font-rubik text-white border-greenButton bg-greenBg">
        {/* Date Selection */}
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none focus:ring-0 flex flex-col items-center py-[0.5em] lg:text-[19px] text-[15px] border-b  border-greenButton">
            <p className="text-[1em] font-normal">
              {searchParams.get("dayName")}
            </p>
            <p className="lg:w-[4em]">{searchParams.get("dateDayNumber")}</p>
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
                    dayNumber === searchParams.get("dateDayNumber")
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

        {/* Time Selection */}
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none focus:ring-0 flex flex-col items-center lg:text-[19px]  py-[0.5em] border-b  border-greenButton">
            <p className="text-[1em] font-normal">Hour</p>
            <p>{searchParams.get("time")}</p>
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
                  time === searchParams.get("time")
                    ? "bg-greyHoverDropDownMenu"
                    : ""
                }`}
                onClick={() => updateSearchParams("time", time)}
              >
                <p>{time}</p>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Guests Selection */}
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none focus:ring-0 flex flex-col items-center justify-center lg:text-[19px]  py-[0.5em]">
            <p className="text-[1em] font-normal">Guests</p>
            <p>{searchParams.get("guests")}</p>
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
                  String(guestNum) === searchParams.get("guests")
                    ? "bg-greyHoverDropDownMenu"
                    : ""
                }`}
                onClick={() => updateSearchParams("guests", String(guestNum))}
              >
                <p>{guestNum}</p>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
