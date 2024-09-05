import React, { useEffect, useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import OrangeCalender from "../svg/OrangeCalender";
import OrangeClock from "../svg/OrangeClock";
import OrangeGuests from "../svg/OrangeGuests";
import OrangeTablesIcon from "../svg/OrangeTablesIcon";
import { Separator } from "@/components/ui/separator";
import { useReservation } from "@/context/ReservationContext";
import ReserveBtn from "./ReserveBtn";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  formatDateToYYYYMMDD,
  formatNowToCustomDateTime,
  formatTo24HourClock,
  generateNext7Days,
  getAvailableHours,
} from "@/services/time.services";
import { useGetLikeTables } from "@/services/tables.services";

interface IAvaliableTable {
  DateTime: string;
  TableId: string;
  Position: string;
  Capacity: string;
}
export interface ICurrentInitial {
  dateTime: string;
  guests: string;
  position: string;
}

const ReservationData: React.FC = () => {
  const {
    likeWantedTables,
    allTables,
    positions,
    setRequestedReservation,
    requestedReservation,
  } = useReservation();
  const getLikeTables = useGetLikeTables();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [type, setType] = useState<
    "date" | "hour" | "guests" | "position" | null
  >(null);
  const [likeWantedOpen, setLikeWantedOpen] = useState<boolean>(false);
  const [filteredHours, setFilteredHours] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const step = searchParams.get("step");

  const [currentInitials, setCurrentInitials] = useState<ICurrentInitial>({
    dateTime: formatNowToCustomDateTime(),
    position: positions[0]?.position || "inside",
    guests: "2",
  });

  const next7Days = generateNext7Days();
  const guestsArr = ["1", "2", "3", "4", "5", "6+"];

  const [stringDate, setStringDate] = useState(
    new Date(new Date()).toLocaleDateString("en-GB", {
      weekday: "short",
      month: "2-digit",
      day: "2-digit",
    })
  );

  useEffect(() => {
    if (requestedReservation) {
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
      setFilteredHours(
        getAvailableHours(
          new Date(currentInitials.dateTime).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
          })
        )
      );
    }
  }, [stringDate]);

  useEffect(() => {
    if (requestedReservation && allTables.length > 0) {
      getLikeTables(currentInitials, stringDate);
    }
  }, [requestedReservation, allTables]);

  const handleDateSelection = (date: string) => {
    setStringDate(date);
    setCurrentInitials((prev) => ({
      ...prev, // Correctly spreading the previous state
      dateTime: `${formatDateToYYYYMMDD(date)}T${prev.dateTime.split("T")[1]}`, // Concatenating the date with the new hour
    }));

    setType("hour");
    setIsOpen(true);
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
      getLikeTables(currentInitials, stringDate);
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
    // navigate(
    //   `/online-reservations?restId=${
    //     searchParams.get("restId") || "0"
    //   }&step=customer-details`
    // );
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
            {currentInitials?.dateTime.split("T")[1] || filteredHours[0]}
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
