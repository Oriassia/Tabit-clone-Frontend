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
import { formatNowToCustomDateTime } from "@/services/timefunctions";

interface IAvaliableTable {
  DateTime: string;
  TableId: string;
  Position: string;
  Capacity: string;
}
interface ICurrentInitial {
  dateTime: string;
  guests: string;
  position: string;
}
const ReservationData: React.FC = () => {
  const {
    likeWantedTables,
    setLikeWantedTables,
    allTables,
    positions,
    setRequestedReservation,
    requestedReservation,
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

  const [currentInitials, setCurrentInitials] = useState<ICurrentInitial>({
    dateTime: formatNowToCustomDateTime(),
    position: positions[0]?.position || "inside",
    guests: "2",
  });

  const [stringDate, setStringDate] = useState(
    new Date(new Date()).toLocaleDateString("en-GB", {
      weekday: "short",
      month: "numeric",
      day: "numeric",
    })
  );
  const formatTo24HourClock = (dateTime: string): string => {
    const timePart = dateTime.split(" ")[1]; // Extract the time part from the dateTime string
    if (!timePart) return ""; // Return empty string if no time part is found

    const [hours, minutes] = timePart.split(":"); // Split the time into hours and minutes
    const formattedHour = parseInt(hours).toString().padStart(2, "0"); // Format hours with leading zero if needed
    const formattedMinutes = minutes.padStart(2, "0"); // Ensure minutes have two digits

    return `${formattedHour}:${formattedMinutes}`; // Return formatted time in "HH:MM" format
  };

  useEffect(() => {
    if (requestedReservation) {
      console.log(requestedReservation.position);
      setCurrentInitials({
        dateTime: requestedReservation.dateTime,
        position: requestedReservation.position,
        guests: requestedReservation.guests,
      });

      setStringDate(
        new Date(requestedReservation.dateTime).toLocaleDateString("en-GB", {
          weekday: "short",
          month: "numeric",
          day: "numeric",
        })
      );
    }
  }, []);

  useEffect(() => {
    if (currentInitials) {
      updateHoursBasedOnDate(currentInitials.dateTime);
    }
  }, [stringDate]);

  useEffect(() => {
    if (requestedReservation && allTables.length > 0) {
      getLikeTables();
    }
  }, [requestedReservation, allTables]);

  function getLikeTables() {
    // Check if all fields are filled
    if (
      !currentInitials.dateTime ||
      !currentInitials.position ||
      !currentInitials.guests
    ) {
      console.error(
        "Incomplete selection criteria. Ensure date, time, position, and guests are selected."
      );
      return;
    }

    // Parse date and time from currentInitials
    const datePart = stringDate.split(", ")[1];
    const [day, month] = datePart.split("/").map(Number); // Corrected to use dd/mm format
    const [hours, minutes] = currentInitials.dateTime
      .split("T")[1]
      .split(":")
      .map(Number);

    // Construct selectedDateTime and nextDayDateTime
    const selectedDateTime = new Date(2024, month - 1, day, hours, minutes); // Manually set year to 2024
    const nextDayDateTime = new Date(2024, month - 1, day + 1, hours, minutes); // Manually add 1 day
    // Convert selectedGuests to a number for comparison
    const guestsCount = parseInt(currentInitials.guests, 10);

    // 1.5 hours window in milliseconds
    const timeWindowMs = 1.5 * 3600000;

    // Filter likeWantedTables based on criteria
    const filteredTables = allTables.filter((table) => {
      const tableDateTime = new Date(table.DateTime); // Convert table.DateTime to a Date object
      const tableDate = tableDateTime.toDateString(); // Get the date part as a string
      const tableTime = tableDateTime.getTime(); // Get time in milliseconds

      const selectedDateStr = selectedDateTime.toDateString(); // Get date part as a string
      const nextDayDateStr = nextDayDateTime.toDateString(); // Get next day date part as a string

      const timeDifference = Math.abs(selectedDateTime.getTime() - tableTime);
      const timeDifferenceNextDay = Math.abs(
        nextDayDateTime.getTime() - tableTime
      );

      const isSameDate = tableDate === selectedDateStr;
      const isNextDay = tableDate === nextDayDateStr;
      const isCapacitySufficient = parseInt(table.Capacity, 10) >= guestsCount; // Check capacity

      // Rule 1: Same Date, Same Hour, Different Position, Capacity sufficient
      if (
        isSameDate &&
        currentInitials.dateTime.split("T")[1] ===
          table.DateTime.split(" ")[1] &&
        table.Position !== currentInitials.position &&
        isCapacitySufficient
      ) {
        return true;
      }

      // Rule 2: Same Date, Within ±1.5 Hours, Same Position, Capacity sufficient
      if (
        isSameDate &&
        timeDifference <= timeWindowMs &&
        table.Position === currentInitials.position &&
        isCapacitySufficient
      ) {
        return true;
      }

      // Rule 3: Same Date, Within ±1.5 Hours, Different Position, Capacity sufficient
      if (
        isSameDate &&
        timeDifference <= timeWindowMs &&
        table.Position !== currentInitials.position &&
        isCapacitySufficient
      ) {
        return true;
      }

      // Rule 4: Next Day, Within ±1.5 Hours, Same Position, Capacity sufficient
      if (
        isNextDay &&
        timeDifferenceNextDay <= timeWindowMs &&
        table.Position === currentInitials.position &&
        isCapacitySufficient
      ) {
        return true;
      }

      // Rule 5: Next Day, Within ±1.5 Hours, Different Position, Capacity sufficient
      if (
        isNextDay &&
        timeDifferenceNextDay <= timeWindowMs &&
        table.Position !== currentInitials.position &&
        isCapacitySufficient
      ) {
        return true;
      }

      // Rule 6: Next Day, Same Hour, Same Position, Capacity sufficient
      if (
        isNextDay &&
        currentInitials.dateTime.split("T")[1] ===
          table.DateTime.split(" ")[1] &&
        table.Position === currentInitials.position &&
        isCapacitySufficient
      ) {
        return true;
      }

      // Rule 7: Next Day, Same Hour, Different Position, Capacity sufficient
      if (
        isNextDay &&
        currentInitials.dateTime.split("T")[1] ===
          table.DateTime.split(" ")[1] &&
        table.Position !== currentInitials.position &&
        isCapacitySufficient
      ) {
        return true;
      }

      return false; // If none of the rules match, it's not a "like" table.
    });

    // Helper function to get top 5 closest tables for each position and day, avoiding duplicate hours
    const getTop5ClosestTables = (tables: any[], targetDate: Date) => {
      // Group tables by position
      const groupedByPosition = tables.reduce((acc: any, table: any) => {
        if (!acc[table.Position]) acc[table.Position] = [];
        acc[table.Position].push(table);
        return acc;
      }, {});

      // Remove duplicate hours for each position
      const removeDuplicateHours = (tables: any[]) => {
        const uniqueByHour: { [key: string]: any } = {};
        tables.forEach((table) => {
          const hour = new Date(table.DateTime).toTimeString().split(" ")[0]; // Get the hour part of DateTime
          if (!uniqueByHour[`${table.Position}-${hour}`]) {
            // Ensure unique by position and hour
            uniqueByHour[`${table.Position}-${hour}`] = table;
          }
        });
        return Object.values(uniqueByHour);
      };

      // Get top 5 closest tables for each position without duplicate hours
      const topTables = Object.values(groupedByPosition).flatMap(
        (tables: any) => {
          const uniqueTables = removeDuplicateHours(tables);
          return uniqueTables
            .sort(
              (a: any, b: any) =>
                Math.abs(
                  new Date(a.DateTime).getTime() - targetDate.getTime()
                ) -
                Math.abs(new Date(b.DateTime).getTime() - targetDate.getTime())
            )
            .slice(0, 5); // Limit to 5 tables
        }
      );

      return topTables;
    };

    // Get top 5 tables for each position and day (current day and next day)
    const top5ForCurrentDay = getTop5ClosestTables(
      filteredTables.filter(
        (table) =>
          new Date(table.DateTime).toDateString() ===
          selectedDateTime.toDateString()
      ),
      selectedDateTime
    );

    const top5ForNextDay = getTop5ClosestTables(
      filteredTables.filter(
        (table) =>
          new Date(table.DateTime).toDateString() ===
          nextDayDateTime.toDateString()
      ),
      nextDayDateTime
    );

    // Combine results
    const combinedTopTables = [...top5ForCurrentDay, ...top5ForNextDay];

    // Sort the combined tables by position, then by hour, and finally by datetime
    combinedTopTables.sort((a, b) => {
      if (a.Position !== b.Position)
        return a.Position.localeCompare(b.Position);
      if (a.DateTime.split(" ")[1] !== b.DateTime.split(" ")[1]) {
        return a.DateTime.split(" ")[1].localeCompare(b.DateTime.split(" ")[1]);
      }
      return new Date(a.DateTime).getTime() - new Date(b.DateTime).getTime();
    });

    console.log("Combined tables: ", combinedTopTables);

    setLikeWantedTables(combinedTopTables); // Update state with the filtered like tables
  }

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
    console.log("days:", days);

    return days;
  }

  function formatDateToYYYYMMDD(dateStr: string | undefined): string {
    if (!dateStr) return "";
    const [_, datePart] = dateStr.split(", ");
    if (!datePart) return "";
    const [day, month] = datePart.split("/").map(Number);
    const year = 2024;
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
      2,
      "0"
    )}`;
  }

  // function formatToDateTime(datePart: string, timePart: string): string {
  //   const targetYear = 2024;
  //   const [_, dateString] = datePart.split(", ").map((part) => part.trim());
  //   const [month, day] = dateString.split("/").map(Number);
  //   const [time] = timePart.split(" ");
  //   let [hours, minutes] = time.split(":").map(Number);

  //   const formattedDate = new Date(targetYear, month - 1, day, hours, minutes);
  //   const formattedString = `${formattedDate.getFullYear()}-${(
  //     formattedDate.getMonth() + 1
  //   )
  //     .toString()
  //     .padStart(2, "0")}-${formattedDate
  //     .getDate()
  //     .toString()
  //     .padStart(2, "0")} ${formattedDate
  //     .getHours()
  //     .toString()
  //     .padStart(2, "0")}:${formattedDate
  //     .getMinutes()
  //     .toString()
  //     .padStart(2, "0")}`;

  //   return formattedString;
  // }

  function updateHoursBasedOnDate(date: string) {
    try {
      const formattedDate = new Date(formatDateToYYYYMMDD(date))
        .toString()
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
    setStringDate(date);
    setCurrentInitials((prev) => ({
      ...prev, // Correctly spreading the previous state
      dateTime: `${formatDateToYYYYMMDD(date)}T${prev.dateTime.split("T")[1]}`, // Concatenating the date with the new hour
    }));

    setType("hour");
    setIsOpen(true);
    updateHoursBasedOnDate(date);
  };

  const handleHourSelection = (hour: string) => {
    setCurrentInitials((prev) => ({
      ...prev, // Correctly spreading the previous state
      dateTime: `${prev.dateTime.split("T")[0]}T${hour}`, // Concatenating the date with the new hour
    }));
    setType("guests");
    setIsOpen(true);
  };

  const handleGuestSelection = (guests: string) => {
    setCurrentInitials((prev) => ({ ...prev, guests }));
    setType("position");
    setIsOpen(true);
  };

  const handlePositionSelection = (position: string) => {
    setCurrentInitials((prev) => ({ ...prev, position }));
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
    const formattedDateTime = currentInitials.dateTime.replace("T", " ");

    const availableTable = allTables?.find((table: IAvaliableTable) => {
      const tableDateTime = table.DateTime.slice(0, 16); // Extract date and time up to minutes

      if (formattedDateTime == tableDateTime) {
        console.log(formattedDateTime + " " + tableDateTime);
      }
      return (
        table.Capacity >= currentInitials.guests && // Ensure type consistency
        table.Position == currentInitials.position &&
        formattedDateTime == tableDateTime // Compare formatted date-time
      );
    });

    if (availableTable) {
      setRequestedReservation({
        ...currentInitials,
        tableId: availableTable.TableId,
      });
      searchParams.set("step", "customer-details");
      setSearchParams(searchParams);
    } else {
      getLikeTables();
      setLikeWantedOpen(true);
    }
  }

  async function reserveLikeTable(table: IAvaliableTable) {
    setRequestedReservation({
      dateTime: table.DateTime,
      position: table.Position,
      tableId: table.TableId,
      guests: currentInitials.guests,
    });
    // Update the search parameters in the URL
    searchParams.set("step", "customer-details"); // This creates a new URLSearchParams object, but does not update the URL itself
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
          <div className="text-center">{stringDate || next7Days[0]}</div>
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
          <div className="text-center">
            {currentInitials?.dateTime.split("T")[1] || futureHours[0]}
          </div>
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
            {currentInitials.guests}{" "}
            {currentInitials.guests === "1" ? "Guest" : "Guests"}
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
            <span className="px-3">
              {currentInitials.position || "Select Position"}
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
                      date === stringDate ? "bg-greySelected" : ""
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
                      hour === currentInitials.dateTime.split("T")[1]
                        ? "bg-greySelected"
                        : ""
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
                      guest === currentInitials.guests ? "bg-greySelected" : ""
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
                      position.position === currentInitials.position
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
            stringDate,
            stringDate &&
              new Date(
                new Date(formatDateToYYYYMMDD(stringDate)).getTime() + 86400000
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
