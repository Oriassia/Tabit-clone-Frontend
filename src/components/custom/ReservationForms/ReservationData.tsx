import { useState, useEffect } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa"; // Import icons from react-icons
import OrangeCalender from "../svg/OrangeCalender";
import OrangeClock from "../svg/OrangeClock";
import OrangeGuests from "../svg/OrangeGuests";
import OrangeTablesIcon from "../svg/OrangeTablesIcon";
import { Separator } from "@/components/ui/separator";
import api from "@/services/api.services";
import { useSearchParams } from "react-router-dom";

function ReservationData({ restId }: { restId: string }) {
  const [searchParams] = useSearchParams();
  const position = searchParams.get("position");
  const tableId = searchParams.get("tableId");
  const dateAnTime: string | null = searchParams.get("date");
  const date: string | null = dateAnTime ? dateAnTime.split("T")[0] : null;
  const hour: string | null = dateAnTime ? dateAnTime.split("T")[1] : null;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedHour, setSelectedHour] = useState<string | null>(hour);
  const [selectedGuests, setSelectedGuests] = useState<string>("2");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [positions, setPositions] = useState<any[]>([]); // Update to any[] to handle objects
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

  // Function to convert 24-hour format to 12-hour format
  function convertTo12HourFormat(hour: number, minute: number): string {
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    const minuteFormatted = minute.toString().padStart(2, "0");
    return `${hour12}:${minuteFormatted} ${ampm}`;
  }

  // Function to filter future times
  function filterFutureTimes(timesArray: string[]): string[] {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    return timesArray
      .map((time) => {
        const [hour, minute] = time.split(":").map(Number);
        return { hour, minute, original: time };
      })
      .filter(({ hour, minute }) => {
        return (
          hour > currentHour || (hour === currentHour && minute > currentMinute)
        );
      })
      .map(({ hour, minute }) => convertTo12HourFormat(hour, minute));
  }

  // Function to generate the next 7 days
  function generateNext7Days(): string[] {
    const days = [];
    const options = {
      weekday: "short",
      month: "numeric",
      day: "numeric",
    } as const;
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date.toLocaleDateString("en-US", options));
    }
    return days;
  }

  // Array of all half-hour slots from "00:00" to "23:30"
  const allHours = [
    "00:00",
    "00:30",
    "01:00",
    "01:30",
    "02:00",
    "02:30",
    "03:00",
    "03:30",
    "04:00",
    "04:30",
    "05:00",
    "05:30",
    "06:00",
    "06:30",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
  ];

  // Compute future hours and dates once and update state
  const futureHours = filterFutureTimes(allHours);
  const next7Days = generateNext7Days();
  const guestsArr = ["1", "2", "3", "4", "5", "6+"];

  useEffect(() => {
    if (!selectedHour && futureHours.length > 0) {
      setSelectedHour(futureHours[0]);
    }
  }, [futureHours, selectedHour]);

  useEffect(() => {
    async function getTablesPositions() {
      try {
        console.log(restId);
        const { data } = await api.get(`/tables/position/${restId}`);
        setPositions(data);
        setSelectedPosition(data[0].position);
      } catch (error) {
        console.error("Failed to fetch tables positions:", error);
      }
    }
    getTablesPositions();
  }, [restId]);
  useEffect(() => {
    if (tableId != null) {
    }
  }, []);
  const handleDateSelection = (date: string) => {
    setSelectedDate(date);
    setType("hour"); // Focus on time selection after date selection
  };

  const handleHourSelection = (hour: string) => {
    setSelectedHour(hour);
    setType("guests"); // Focus on guest selection after time selection
  };

  const handleGuestSelection = (guest: string) => {
    setSelectedGuests(guest);
    setType("position"); // Focus on position selection after guest selection
  };

  const handlePositionSelection = (position: string) => {
    setSelectedPosition(position);
    setIsOpen(false); // Close dropdown
  };

  return (
    <>
      <div className="min-w-[10rem] w-2/3 max-w-[35rem] grid grid-cols-3 shadow-xl shadow-greyShadow rounded-lg">
        {/* Date selection */}
        <div
          className={`relative col-span-1 p-4 h-24 flex flex-col items-center justify-center ${
            type == "date" && isOpen
              ? "border-[1px] border-orange"
              : "border-r-[1px] border-white"
          } rounded-lg cursor-pointer `}
          onClick={() => {
            setIsOpen(!isOpen);
            setType("date");
          }}
        >
          {/* Arrow Icon */}
          <span className="absolute top-3 left-1 text-sm w-4 pl-2">
            {type === "date" && isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </span>
          <div className="flex w-full justify-center mb-3">
            <OrangeCalender /> {/* Smaller icon size */}
          </div>
          <div className="text-center">{selectedDate || next7Days[0]}</div>
        </div>

        {/* Time selection */}
        <div
          className={`relative col-span-1 p-4 h-24 flex flex-col items-center justify-center ${
            type == "hour" && isOpen
              ? "border-[1px] border-orange"
              : "border-r-[1px] border-white"
          } rounded-lg cursor-pointer `}
          onClick={() => {
            setIsOpen(!isOpen);
            setType("hour");
          }}
        >
          {/* Arrow Icon */}
          <span className="absolute top-3 left-1 text-sm w-4 pl-2">
            {type === "hour" && isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </span>
          <div className="flex w-full justify-center mb-3">
            <OrangeClock /> {/* Smaller icon size */}
          </div>
          <div className="text-center">{selectedHour || "Select a time"}</div>
        </div>

        {/* Guests selection */}
        <div
          className={`relative col-span-1 p-4 h-24 flex flex-col items-center justify-center ${
            type == "guests" && isOpen ? "border-[1px] border-orange" : ""
          } rounded-lg cursor-pointer `}
          onClick={() => {
            setIsOpen(!isOpen);
            setType("guests");
          }}
        >
          {/* Arrow Icon */}
          <span className="absolute top-3 left-1 text-sm w-4 pl-2">
            {type === "guests" && isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </span>
          <div className="flex w-full justify-center mb-3">
            <OrangeGuests /> {/* Smaller icon size */}
          </div>
          <div className="text-center">
            {selectedGuests} {selectedGuests == "1" ? "Guest" : "Guests"}
          </div>
        </div>

        {/* Position selection */}
        {positions.length > 1 && (
          <div
            className={`relative col-span-3 p-3 h-16 flex items-center pl-6  ${
              type == "position" && isOpen
                ? "border-[1px] border-orange"
                : "border-t-[1px] border-white"
            } rounded-lg w-full cursor-pointer`}
            onClick={() => {
              setIsOpen(!isOpen);
              setType("position");
            }}
          >
            {/* Arrow Icon */}
            <span className="absolute top-3 right-3 text-sm w-4 pl-2">
              {type === "position" && isOpen ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </span>
            <OrangeTablesIcon />
            <span className="ml-3">
              {selectedPosition || "Select position"}
            </span>
          </div>
        )}
      </div>

      {/* Dropdown area */}
      {isOpen && (
        <div className="min-w-[14rem] w-[71%] max-w-[40rem] h-60 overflow-y-scroll scrollbar-none mt-5">
          {type === "date"
            ? next7Days.map((date) => (
                <div key={date} className="w-full">
                  <div
                    className={`${
                      date === selectedDate ? "bg-greySelected" : ""
                    } w-full h-10 flex items-center p-4 py-6 cursor-pointer`}
                    onClick={() => handleDateSelection(date)}
                  >
                    <span>{date}</span>
                  </div>
                  <Separator />
                </div>
              ))
            : type === "hour"
            ? futureHours.map((hour) => (
                <div key={hour} className="w-full">
                  <div
                    className={`${
                      hour === selectedHour ? "bg-greySelected" : ""
                    } w-full h-10 flex items-center p-4 py-6 cursor-pointer`}
                    onClick={() => handleHourSelection(hour)}
                  >
                    <span>{hour}</span>
                  </div>
                  <Separator />
                </div>
              ))
            : type === "guests"
            ? guestsArr.map((guest) => (
                <div key={guest} className="w-full">
                  <div
                    className={`${
                      guest === selectedGuests ? "bg-greySelected" : ""
                    } w-full h-10 flex items-center p-4 py-6 cursor-pointer`}
                    onClick={() => handleGuestSelection(guest)}
                  >
                    <span>
                      {guest} {guest == "1" ? "Guest" : "Guests"}
                    </span>
                  </div>
                  <Separator />
                </div>
              ))
            : type === "position"
            ? positions.map((position) => (
                <div key={position.position} className="w-full">
                  <div
                    className={`${
                      position.position === selectedPosition
                        ? "bg-greySelected"
                        : ""
                    } w-full h-10 flex items-center p-4 py-6 cursor-pointer`}
                    onClick={() => handlePositionSelection(position.position)}
                  >
                    <span>{position.position}</span>
                  </div>
                  <Separator />
                </div>
              ))
            : null}
        </div>
      )}
    </>
  );
}

export default ReservationData;
