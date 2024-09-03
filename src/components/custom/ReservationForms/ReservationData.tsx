import { useState, useEffect } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import OrangeCalender from "../svg/OrangeCalender";
import OrangeClock from "../svg/OrangeClock";
import OrangeGuests from "../svg/OrangeGuests";
import OrangeTablesIcon from "../svg/OrangeTablesIcon";
import { Separator } from "@/components/ui/separator";
import api from "@/services/api.services";
import { useSearchParams } from "react-router-dom";
import ReserveBtn from "./ReserveBtn";

interface IAvaliableTable {
  DateTime: string;
  TableId: string;
  Position: string;
  Capacity: string;
}

function ReservationData({ restId }: { restId: string }) {
  const [searchParams] = useSearchParams();
  const position: string | null = searchParams.get("position");
  console.log(position);

  const guests: string | null = searchParams.get("guests");
  const tableId: string | null = searchParams.get("tableId");
  const dateAndTime: string | null = searchParams.get("date");
  const date: string | null = dateAndTime ? dateAndTime.split("T")[0] : null;
  const hour: string | null = dateAndTime ? dateAndTime.split("T")[1] : null;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedHour, setSelectedHour] = useState<string>(hour || ""); // Ensure it's a string
  const [selectedGuests, setSelectedGuests] = useState<string>(guests || "2");
  const [selectedDate, setSelectedDate] = useState<string>(
    date || formatDateToShortString(new Date().toDateString())
  ); // Ensure it's a string
  const [type, setType] = useState<string | null>(null);
  const [positions, setPositions] = useState<any[]>([]); // Update to any[] to handle objects
  const [selectedPosition, setSelectedPosition] = useState<string | null>(
    position
  );
  const [allTables, setAllTables] = useState<IAvaliableTable[] | null>(null);
  const [likeWantedTables, setLikeWantedTables] = useState<IAvaliableTable[]>(
    []
  );
  const [likeWantedOpen, setLikeWantedOpen] = useState<boolean>(true);
  const [filteredHours, setFilteredHours] = useState<string[]>([]);

  // Function to convert 24-hour format to 12-hour format
  function convertTo12HourFormat(hour: number, minute: number): string {
    const ampm = hour >= 12 ? "pm" : "am";
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    const minuteFormatted = minute.toString().padStart(2, "0");
    return `${hour12}:${minuteFormatted}${ampm}`;
  }

  function formatDateToShortString(dateString: string) {
    const date = new Date(dateString);
    const day = date.toLocaleDateString("en-US", { weekday: "short" }); // "Mon"
    const month = date.getMonth() + 1; // Month is 0-indexed, so add 1
    const dayOfMonth = date.getDate(); // Day of the month
    return `${day}, ${month}/${dayOfMonth}`;
  }

  function formatDateToYYYYMMDD(dateStr: string | undefined): string {
    if (!dateStr) return ""; // Return empty or handle accordingly if undefined
    const [_, datePart] = dateStr.split(", ");
    if (!datePart) return ""; // Handle cases where the split does not produce expected results
    const [month, day] = datePart.split("/").map(Number);
    const year = 2024; // Fixed year
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
      2,
      "0"
    )}`;
  }

  function formatToDateTime(datePart: string, timePart: string): string {
    const targetYear = 2024;
    const [_, dateString] = datePart.split(", ").map((part) => part.trim());
    const [month, day] = dateString.split("/").map(Number);
    const [time, period] = timePart.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (period === "PM" && hours !== 12) {
      hours += 12; // Convert PM to 24-hour format, except for 12 PM
    } else if (period === "AM" && hours === 12) {
      hours = 0; // Convert 12 AM to 0
    }

    const formattedDate = new Date(targetYear, month - 1, day, hours, minutes);
    const formattedString = `${formattedDate.getFullYear()}-${(
      formattedDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${formattedDate
      .getDate()
      .toString()
      .padStart(2, "0")}T${formattedDate
      .getHours()
      .toString()
      .padStart(2, "0")}:${formattedDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    return formattedString;
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
  function updateHoursBasedOnDate(date: string) {
    try {
      const formattedDate = new Date(formatDateToYYYYMMDD(date))
        .toISOString()
        .split("T")[0];
      if (isToday(formattedDate)) {
        setFilteredHours(futureHours);
      } else {
        setFilteredHours(allHours);
      }
    } catch (error) {
      console.error("Error parsing date:", error);
      setFilteredHours(allHours);
    }
  }

  function isToday(date: string): boolean {
    const today = new Date();
    const selected = new Date(Date.parse(date));
    return (
      today.getFullYear() === selected.getFullYear() &&
      today.getMonth() === selected.getMonth() &&
      today.getDate() === selected.getDate()
    );
  }

  async function getAllTables() {
    try {
      const { data } = await api.get(`/tables/${restId}`);
      setAllTables(data);
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch tables:", error);
    }
  }

  // Function to find "like" tables based on user preferences
  function getLikeTables() {
    if (!allTables || !selectedDate || !selectedHour || !selectedPosition)
      return;

    console.log("selectedDate: " + formatDateToYYYYMMDD(selectedDate));
    console.log("selectedHour: ", selectedHour);

    const desiredDate = formatDateToYYYYMMDD(selectedDate).trim();
    const desiredHour = selectedHour.trim();
    const desiredTime = desiredDate + "T" + desiredHour;
    console.log("desiredTime: ", desiredTime);

    const desiredPosition = selectedPosition.trim().toLowerCase();
    const [desiredHourInt, desiredMinuteInt] = desiredHour
      .split(":")
      .map(Number);
    const desiredTotalMinutes = desiredHourInt * 60 + desiredMinuteInt;

    const nextDayDate = formatDateToYYYYMMDD(
      new Date(new Date(selectedDate).getTime() + 86400000).toDateString()
    );

    const likeTables = allTables.filter((table) => {
      const [tableDate, tableTime] = table.DateTime.split("T");
      const tablePosition = table.Position.trim().toLowerCase();
      const [tableHourInt, tableMinuteInt] = tableTime.split(":").map(Number);
      const tableTotalMinutes = tableHourInt * 60 + tableMinuteInt;
      const timeDifference = Math.abs(tableTotalMinutes - desiredTotalMinutes);

      // Rule 1: Same date, same hour, different position
      const isSameDateSameHourDifferentPosition =
        tableDate === desiredDate &&
        tableTime === desiredHour &&
        tablePosition !== desiredPosition;

      // Rule 2: Same date, different hour (3 hours before and after user's time), all positions
      const isSameDateDifferentHourWithinRange =
        tableDate === desiredDate &&
        tableTime !== desiredHour &&
        timeDifference <= 180;

      // Rule 3: Next day, different hour (3 hours before and after user's time) or user's hour, all positions
      const isNextDayDifferentHourWithinRangeOrUserHour =
        tableDate === nextDayDate &&
        (tableTime === desiredHour || timeDifference <= 180);

      return (
        isSameDateSameHourDifferentPosition ||
        isSameDateDifferentHourWithinRange ||
        isNextDayDifferentHourWithinRangeOrUserHour
      );
    });

    console.log("like tables ", likeTables);
    setLikeWantedTables(likeTables);
  }

  useEffect(() => {
    if (selectedDate) {
      updateHoursBasedOnDate(selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (selectedDate && selectedHour && selectedPosition && allTables) {
      getLikeTables();
    }
  }, [selectedDate, selectedHour, selectedPosition, allTables]);

  useEffect(() => {
    if (filteredHours.length > 0) {
      if (!selectedHour || !filteredHours.includes(selectedHour)) {
        setSelectedHour(filteredHours[0]);
      }
    }
  }, [filteredHours, selectedHour]);

  useEffect(() => {
    async function getTablesPositions() {
      try {
        const { data } = await api.get(`/tables/position/${restId}`);
        setPositions(data);

        if (!position) {
          setSelectedPosition(data[0].position);
        }
      } catch (error) {
        console.error("Failed to fetch tables positions:", error);
      }
    }
    getTablesPositions();
    getAllTables();
  }, [restId]);

  const handleDateSelection = (date: string) => {
    setSelectedDate(date);
    setType("hour");
    updateHoursBasedOnDate(date);
  };

  const handleHourSelection = (hour: string) => {
    setSelectedHour(hour);
    setType("guests");
  };

  const handleGuestSelection = (guest: string) => {
    setSelectedGuests(guest);
    setType("position");
  };

  const handlePositionSelection = (position: string) => {
    setSelectedPosition(position);
    setIsOpen(false);
  };

  async function reserveATable() {
    if (tableId == null) {
      const availableTable = allTables?.find(
        (table) =>
          table.Capacity === selectedGuests &&
          table.Position === selectedPosition &&
          formatToDateTime(selectedDate, selectedHour) === table.DateTime
      );
      if (availableTable) {
        console.log("Found Available Table:", availableTable.TableId);
      } else {
        console.log("No Available Table Found.");
        getLikeTables();
        setLikeWantedOpen(true);
      }
    } else {
      console.log("Table already selected:", tableId);
    }
  }
  const formatTo12HourClock = (dateTime: string) => {
    // Extract time part from DateTime string
    const timePart = dateTime.split("T")[1]; // e.g., "14:30:00"

    // Split hours, minutes, and seconds
    const [hours, minutes, seconds] = timePart.split(":");

    // Convert hours from 24-hour format to 12-hour format
    const hour = parseInt(hours);
    const period = hour >= 12 ? "pm" : "am";
    const formattedHour = hour % 12 || 12; // If hour is 0 or 12, it remains 12

    // Construct the formatted time string
    return `${formattedHour}:${minutes}${period}`;
  };

  return (
    <>
      <div className="min-w-[10rem] w-2/3 max-w-[35rem] grid grid-cols-3 shadow-xl shadow-greyShadow rounded-lg">
        {/* Date selection */}
        <div
          className={`relative col-span-1 p-4 h-24 flex flex-col items-center justify-center ${
            type === "date" && isOpen
              ? "border-[1px] border-orange"
              : "border-r-[1px] border-white"
          } rounded-lg cursor-pointer `}
          onClick={() => {
            setIsOpen(!isOpen);
            setType("date");
          }}
        >
          <span className="absolute top-3 left-1 text-sm w-4 pl-2">
            {type === "date" && isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </span>
          <div className="flex w-full justify-center mb-3">
            <OrangeCalender />
          </div>
          <div className="text-center">{selectedDate || next7Days[0]}</div>
        </div>

        {/* Time selection */}
        <div
          className={`relative col-span-1 p-4 h-24 flex flex-col items-center justify-center ${
            type === "hour" && isOpen
              ? "border-[1px] border-orange"
              : "border-r-[1px] border-white"
          } rounded-lg cursor-pointer `}
          onClick={() => {
            setIsOpen(!isOpen);
            setType("hour");
          }}
        >
          <span className="absolute top-3 left-1 text-sm w-4 pl-2">
            {type === "hour" && isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </span>
          <div className="flex w-full justify-center mb-3">
            <OrangeClock />
          </div>
          <div className="text-center">{selectedHour || futureHours[0]}</div>
        </div>

        {/* Guests selection */}
        <div
          className={`relative col-span-1 p-4 h-24 flex flex-col items-center justify-center ${
            type === "guests" && isOpen ? "border-[1px] border-orange" : ""
          } rounded-lg cursor-pointer `}
          onClick={() => {
            setIsOpen(!isOpen);
            setType("guests");
          }}
        >
          <span className="absolute top-3 left-1 text-sm w-4 pl-2">
            {type === "guests" && isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </span>
          <div className="flex w-full justify-center mb-3">
            <OrangeGuests />
          </div>
          <div className="text-center">
            {selectedGuests} {selectedGuests === "1" ? "Guest" : "Guests"}
          </div>
        </div>

        {/* Position selection */}
        {positions.length > 1 && (
          <div
            className={`relative col-span-3 p-3 h-16 flex items-center pl-6  ${
              type === "position" && isOpen
                ? "border-[1px] border-orange"
                : "border-t-[1px] border-white"
            } rounded-lg w-full cursor-pointer`}
            onClick={() => {
              setIsOpen(!isOpen);
              setType("position");
            }}
          >
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
            ? filteredHours.map((hour) => (
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
                      {guest} {guest === "1" ? "Guest" : "Guests"}
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
                    } w-full h-10 flex items-center p-4 py-6 cursor-pointer border-t-[0.5px] border-greyFooterText`}
                    onClick={() => handlePositionSelection(position.position)}
                  >
                    <span>{position.position}</span>
                  </div>
                </div>
              ))
            : null}
        </div>
      )}
      {likeWantedOpen ? (
        <div className="w-full">
          <div className="w-full bg-greySelectedRestaurant text-white text-center p-3">
            No exact match, showing closest results:
          </div>
          {/* Calculate and display tables for selected date and day after */}
          {[
            selectedDate,
            selectedDate &&
              formatDateToYYYYMMDD(
                new Date(
                  new Date(selectedDate).getTime() + 86400000
                ).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "numeric",
                  day: "numeric",
                })
              ),
          ]
            .filter(Boolean)
            .map((date, index) =>
              date ? (
                <div
                  key={index}
                  className="mb-4 border-b-[1px] border-white pb-5 w-3/5 mx-auto"
                >
                  {/* Display Date */}
                  <div className="mx-auto text-white text-center text-xl font-bold p-3 ">
                    {/* Format date as "Tuesday, Sep 3" */}
                    {new Date(date).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>

                  {/* Display tables for each position on that date */}
                  {positions.map((positionObj, posIndex) => {
                    const filteredTables = likeWantedTables.filter(
                      (table) => table.Position === positionObj.position
                    ); // Filter tables by position

                    // Render only if there are tables for this position
                    return filteredTables.length > 0 ? (
                      <div
                        key={posIndex}
                        className="flex flex-col align-middle items-center"
                      >
                        <div className="mx-auto text-white text-center p-3 text-xl">
                          {positionObj.position}
                        </div>
                        <div className="w-full flex px-0 justify-between align-middle">
                          {filteredTables.map((table) => (
                            <div
                              key={table.TableId + table.DateTime} // Ensure a unique key
                              className="bg-greySelectedRestaurant text-center p-2 border-[1px] rounded-md border-orange border-solid "
                            >
                              {formatTo12HourClock(table.DateTime)}{" "}
                              {/* Display the time part */}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null; // Don't render anything if there are no tables for this position
                  })}
                </div>
              ) : null
            )}
        </div>
      ) : (
        ""
      )}

      <ReserveBtn
        onClick={() => {
          console.log(allTables);
        }}
      />
    </>
  );
}

export default ReservationData;
