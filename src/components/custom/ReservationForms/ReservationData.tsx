import React, { useEffect, useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import OrangeCalender from "../svg/OrangeCalender";
import OrangeClock from "../svg/OrangeClock";
import OrangeGuests from "../svg/OrangeGuests";
import OrangeTablesIcon from "../svg/OrangeTablesIcon";
import { Separator } from "@/components/ui/separator";
import { useReservation } from "@/context/ReservationContext";
import ReserveBtn from "./ReserveBtn";
import { useSearchParams } from "react-router-dom";

interface IAvaliableTable {
  DateTime: string;
  TableId: string;
  Position: string;
  Capacity: string;
}

const ReservationData: React.FC = () => {
  const {
    selectedDate,
    setSelectedDate,
    selectedHour,
    setSelectedHour,
    selectedGuests,
    setSelectedGuests,
    selectedPosition,
    setSelectedPosition,
    likeWantedTables,

    getLikeTables,
    tableId,
    setTableId,
    allTables,
    positions,
  } = useReservation();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [type, setType] = useState<
    "date" | "hour" | "guests" | "position" | null
  >(null);
  const [likeWantedOpen, setLikeWantedOpen] = useState<boolean>(false);
  const [filteredHours, setFilteredHours] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const step = searchParams.get("step");

  const allHours = [
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

  const futureHours = filterFutureTimes(allHours);
  const next7Days = generateNext7Days();
  const guestsArr = ["1", "2", "3", "4", "5", "6+"];
  const formatTo24HourClock = (dateTime: string): string => {
    const timePart = dateTime.split(" ")[1]; // Extract the time part from the dateTime string
    if (!timePart) return ""; // Return empty string if no time part is found

    const [hours, minutes] = timePart.split(":"); // Split the time into hours and minutes
    const formattedHour = parseInt(hours).toString().padStart(2, "0"); // Format hours with leading zero if needed
    const formattedMinutes = minutes.padStart(2, "0"); // Ensure minutes have two digits

    return `${formattedHour}:${formattedMinutes}`; // Return formatted time in "HH:MM" format
  };

  useEffect(() => {
    if (!selectedDate && next7Days.length > 0) {
      setSelectedDate(next7Days[0]);
    }
  }, [selectedDate, next7Days, setSelectedDate]);

  useEffect(() => {
    if (selectedDate) {
      updateHoursBasedOnDate(selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (
      selectedDate &&
      selectedHour &&
      selectedPosition &&
      allTables.length > 0
    ) {
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
      .map(({ hour, minute }) => {
        const formattedHour = hour.toString().padStart(2, "0");
        const formattedMinute = minute.toString().padStart(2, "0");
        return `${formattedHour}:${formattedMinute}`;
      });
  }

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
      days.push(date.toLocaleDateString("en-GB", options));
    }
    return days;
  }

  function formatDateToYYYYMMDD(dateStr: string | undefined): string {
    if (!dateStr) return "";
    const [_, datePart] = dateStr.split(", ");
    if (!datePart) return "";
    const [month, day] = datePart.split("/").map(Number);
    const year = 2024;
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
      2,
      "0"
    )}`;
  }

  function formatToDateTime(datePart: string, timePart: string): string {
    const targetYear = 2024;
    const [_, dateString] = datePart.split(", ").map((part) => part.trim());
    const [month, day] = dateString.split("/").map(Number);
    const [time] = timePart.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    const formattedDate = new Date(targetYear, month - 1, day, hours, minutes);
    const formattedString = `${formattedDate.getFullYear()}-${(
      formattedDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${formattedDate
      .getDate()
      .toString()
      .padStart(2, "0")} ${formattedDate
      .getHours()
      .toString()
      .padStart(2, "0")}:${formattedDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    return formattedString;
  }

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

  const handleDateSelection = (date: string) => {
    setSelectedDate(date);
    setType("hour");
    setIsOpen(true);
    updateHoursBasedOnDate(date);
  };

  const handleHourSelection = (hour: string) => {
    setSelectedHour(hour);
    setType("guests");
    setIsOpen(true);
  };

  const handleGuestSelection = (guest: string) => {
    setSelectedGuests(guest);
    setType("position");
    setIsOpen(true);
  };

  const handlePositionSelection = (position: string) => {
    setSelectedPosition(position);
    setIsOpen(false);
    setType(null);
  };

  const toggleDropdown = (
    dropdownType: "date" | "hour" | "guests" | "position"
  ) => {
    if (step != "search") return;
    if (type === dropdownType) {
      setIsOpen(!isOpen);
    } else {
      setType(dropdownType);
      setIsOpen(true);
    }
  };

  async function reserveATable() {
    if (tableId == "0") {
      const formattedDateTime = formatToDateTime(selectedDate, selectedHour);

      const availableTable = allTables?.find((table: IAvaliableTable) => {
        const tableDateTime = table.DateTime.slice(0, 16); // Extract date and time up to minutes

        // Debugging logs
        console.log("Formatted DateTime:", formattedDateTime);
        console.log("Table DateTime:", tableDateTime);
        console.log(
          "Guests:",
          selectedGuests,
          "Table Capacity:",
          table.Capacity
        );

        return (
          Number(table.Capacity) >= Number(selectedGuests) && // Ensure type consistency
          table.Position === selectedPosition &&
          formattedDateTime === tableDateTime // Compare formatted date-time
        );
      });

      if (availableTable) {
        console.log("Table found:", availableTable);
        setTableId(availableTable.TableId);
        searchParams.set("tableid", availableTable.TableId);
        setSearchParams(searchParams);
      } else {
        console.log("No exact match found, searching for similar tables.");
        getLikeTables();
        setLikeWantedOpen(true);
      }
    } else {
      console.log("Table already selected:", tableId);
    }
  }

  async function reserveLikeTable(table: IAvaliableTable) {
    console.log("Reserving like table:", table.TableId);
    setTableId(table.TableId);

    const formattedDate = new Date(table.DateTime).toLocaleDateString("en-GB", {
      weekday: "short",
      month: "numeric",
      day: "numeric",
    });

    setSelectedDate(formattedDate);
    const formattedTime = formatTo24HourClock(table.DateTime);
    setSelectedHour(formattedTime);
    setSelectedPosition(table.Position);
    setSelectedPosition(table.Position);
    setSelectedGuests(table.Capacity);

    // Update the search parameters in the URL
    searchParams.set("tableid", table.TableId); // This creates a new URLSearchParams object, but does not update the URL itself
    setSearchParams(searchParams); // This will update the URL with the modified searchParams
  }

  return (
    <>
      {/* Main UI for Date, Time, Guests, and Position Selection */}
      <div className="min-w-[10rem] w-2/3 max-w-[35rem] grid grid-cols-3 shadow-slate-500 shadow rounded-lg text-lg">
        {/* Date selection */}
        <div
          className={`relative col-span-1 p-4 h-24 flex flex-col items-center justify-center ${
            type === "date" && isOpen
              ? "border-[1px] border-orange"
              : "border-r-[1px] border-white"
          }  cursor-pointer `}
          onClick={() => toggleDropdown("date")}
        >
          <span className="absolute top-3 left-1 text-sm w-4 pl-2">
            {step == "search" ? (
              type === "date" && isOpen ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )
            ) : (
              ""
            )}
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
          } cursor-pointer `}
          onClick={() => toggleDropdown("hour")}
        >
          <span className="absolute top-3 left-1 text-sm w-4 pl-2">
            {step == "search" ? (
              type === "hour" && isOpen ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )
            ) : (
              ""
            )}
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
          } cursor-pointer `}
          onClick={() => toggleDropdown("guests")}
        >
          <span className="absolute top-3 left-1 text-sm w-4 pl-2">
            {step == "search" ? (
              type === "guests" && isOpen ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )
            ) : (
              ""
            )}
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
            className={`relative col-span-3 p-3 h-16 flex items-center pl-6 ${
              type === "position" && isOpen
                ? "border-[1px] border-orange"
                : "border-t-[1px] border-white"
            } w-full cursor-pointer`}
            onClick={() => toggleDropdown("position")}
          >
            <span className="absolute top-3 right-3 text-sm w-4 pl-2">
              {step == "search" ? (
                type === "position" && isOpen ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )
              ) : (
                ""
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
      {isOpen && type && (
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
      {/* Similar UI for likeWantedOpen */}
      {likeWantedOpen ? (
        <div className="w-full">
          <div className="w-full bg-greySelectedRestaurant text-white text-center p-3">
            No exact match, showing closest results:
          </div>
          {[
            selectedDate,
            selectedDate &&
              new Date(
                new Date(formatDateToYYYYMMDD(selectedDate)).getTime() +
                  86400000
              ).toLocaleDateString("en-GB", {
                weekday: "short",
                month: "numeric",
                day: "numeric",
              }),
          ]
            .filter(Boolean)
            .map((date, index) => {
              // Filter tables for the current date
              const tablesForDate = likeWantedTables.filter((table) => {
                const tableDate = new Date(table.DateTime).toLocaleDateString(
                  "en-GB",
                  {
                    weekday: "short",
                    month: "numeric",
                    day: "numeric",
                  }
                );
                return tableDate === date;
              });

              // If no tables for this date, skip rendering
              if (tablesForDate.length === 0) {
                return null;
              }

              return (
                <div
                  key={index}
                  className="mb-4 border-b-[1px] border-white pb-5 w-3/5 mx-auto"
                >
                  <div className="mx-auto text-white text-center text-xl font-bold p-3 ">
                    {new Date(formatDateToYYYYMMDD(date)).toLocaleDateString(
                      "en-GB",
                      {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </div>
                  {positions.map((positionObj, posIndex) => {
                    // Filter tables for the current position
                    const filteredTables = tablesForDate.filter(
                      (table) => table.Position === positionObj.position
                    );

                    // If no tables for this position, skip rendering
                    if (filteredTables.length === 0) {
                      return null;
                    }

                    return (
                      <div
                        key={posIndex}
                        className="flex flex-col align-middle items-center"
                      >
                        <div className="mx-auto text-white text-center p-3 text-xl">
                          {positionObj.position}
                        </div>
                        <div className="w-full flex px-0 gap-2 justify-center align-middle">
                          {filteredTables.map((table) => (
                            <div
                              key={table.TableId + table.DateTime}
                              className="bg-greySelectedRestaurant text-center p-2 border-[1px] rounded-md border-orange border-solid cursor-pointer"
                              onClick={() => {
                                reserveLikeTable(table);
                              }}
                            >
                              {formatTo24HourClock(table.DateTime)}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
        </div>
      ) : (
        ""
      )}

      {step == "search" ? <ReserveBtn onClick={reserveATable} /> : ""}
    </>
  );
};

export default ReservationData;
