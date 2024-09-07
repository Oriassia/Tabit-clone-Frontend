import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import GiftCard from "@/components/custom/CardsForRestaurants/GiftCard";
import ShowMore from "@/components/custom/CardsForRestaurants/ShowMore";
import RestaurantCard from "@/components/custom/CardsForRestaurants/RestaurantCard";
import { IReservationInput } from "@/components/custom/ReservationSelector/ReservationSelector";
import { IRestaurant } from "@/types/restaurant";
import api from "@/services/api.services";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  formatDate,
  formatDateString,
  getAvailableHours,
} from "@/services/time.services";
import { GoDotFill } from "react-icons/go";
import { MdMyLocation } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useLocationsContext } from "@/context/LocationsContext";

const getRoundedTime = (date: Date) => {
  const minutes = date.getMinutes();
  if (minutes > 30) {
    date.setHours(date.getHours() + 1);
    date.setMinutes(0);
  } else if (minutes > 0 && minutes <= 30) {
    date.setMinutes(30);
  }
  return date.toTimeString().slice(0, 5);
};

function LandingPage() {
  const [AllRestaurants, setAllRestaurants] = useState<IRestaurant[]>([]);
  const { locationsCoordinates } = useLocationsContext();
  const [reservationInputData, setReservationInputData] =
    useState<IReservationInput>({
      dayName: new Date().toLocaleDateString("en-GB", { weekday: "long" }),
      dateDayNumber: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
      }),
      time: getRoundedTime(new Date()),
      guests: 2,
      area: "Around you",
    });

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
    setAvailableTimes(getAvailableHours(reservationInputData.dateDayNumber));
  }, [reservationInputData.dateDayNumber]);

  useEffect(() => {
    fetchAllRests();
  }, []);

  async function fetchAllRests() {
    try {
      const { data } = await api.get("/restaurants");
      setAllRestaurants(data);
    } catch (error) {}
  }

  const onDateChange = useCallback((newDate: Date) => {
    const dayName = newDate.toLocaleDateString("en-GB", { weekday: "long" });
    const dayNumber = newDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
    });

    setReservationInputData((prevState) => ({
      ...prevState,
      dayName,
      dateDayNumber: dayNumber,
      time: getRoundedTime(newDate),
    }));
  }, []);

  const onTimeChange = useCallback((newTime: string) => {
    setReservationInputData((prevState) => ({
      ...prevState,
      time: newTime,
    }));
  }, []);

  const handleAreaChange = useCallback((newArea: string) => {
    setReservationInputData((prev) => ({ ...prev, area: newArea }));
  }, []);

  const handlePartySizeChange = useCallback((newSize: number) => {
    setReservationInputData((prev) => ({ ...prev, guests: newSize }));
  }, []);

  const handleAddNewAddress = useCallback(() => {
    console.log("Add a new address clicked");
  }, []);

  return (
    <>
      {/*RESERVATION PART*/}
      <section
        className="relative flex flex-col items-center pt-[6em] min-w-[350px] lg:min-w-[450px] bg-cover bg-center shadow-inner "
        style={{
          backgroundImage: `
          linear-gradient(to bottom, 
            rgba(0, 0, 0, 0.7), 
            rgba(0, 0, 0, 0.5) 70%, 
            rgba(0, 200, 200, 1) 100%
          ),
          url('https://tabitisrael.co.il/assets/images/dashboard-desktop.jpg?v=4_11_1')
        `,
          boxShadow: "inset 0 0 1rem #000",
        }}
      >
        <h1 className="lg:text-[3.55em] text-[2em] text-white font-rubik font-normal md:pt-14">
          Reserve a table!
        </h1>
        <p className="pb-4  text-white font-rubik px-[1.3em] text-[0.95rem] lg:px-0 lg:text-[1.5em] min-w-[280px] lg:max-w-[450px] text-center">
          Just say when and which restaurant, and the rest is on us
        </p>

        {/* reservation section */}
        <div className="flex border-2 rounded-[1.7rem] font-bold font-rubik text-white border-greenButton min-w-[280px] lg:min-w-[450px] bg-greenBg">
          {/* Date Selection */}
          <div className="flex flex-col justify-center items-center px-[25px] lg:px-[40px] py-[0.5em] lg:text-[19px] text-[15px] lg:max-w-[220px] max-w-[110px] border-r-2 border-greenButton">
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none focus:ring-0 items-center">
                <p className="text-[1em] font-normal text-center">
                  {reservationInputData.dayName}
                </p>
                <p className="">
                  {formatDateString(reservationInputData.dateDayNumber)}
                </p>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-greyDropDownMenu border-none text-white p-0 rounded-[1%] font-rubik min-w-[100px] max-h-48 overflow-y-auto"
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
          <div className="flex flex-col items-center lg:text-[19px] px-[30px] lg:px-[45px] py-[0.5em] border-r-2 lg:max-w-[120px] max-w-[90px]  border-greenButton">
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
          <div className="flex flex-col justify-center items-center px-[25px] lg:px-[40px] py-[0.5em] lg:text-[19px] text-[15px] lg:max-w-[220px] max-w-[110px] ">
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
                    onClick={() => handlePartySizeChange(guestNum)}
                  >
                    <p>{guestNum}</p>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Button className="bg-greenButton dark:bg-greenButton dark:hover:bg-greenButton text-black font-rubik font-bold min-w-[310px] lg:w-[450px] py-6 text-[16px] rounded-full hover:bg-greenButton my-3">
          <Link
            to={`/book-a-table?dayName=${reservationInputData.dayName}&dateDayNumber=${reservationInputData.dateDayNumber}&time=${reservationInputData.time}&guests=${reservationInputData.guests}&area=${reservationInputData.area}`}
          >
            Find a table
          </Link>
        </Button>

        {/* Area Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none focus:ring-0 flex items-center gap-2 pb-[2em]">
            <GoDotFill className="text-greenButton items-center text-[19px]" />
            <span className="font-bold font-rubik text-white text-[19px]">
              {reservationInputData.area}
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
              onClick={() =>
                handleAreaChange(
                  locationsCoordinates.userLocation.lat &&
                    locationsCoordinates.userLocation.lng
                    ? "Around me"
                    : "Actual location unavailable"
                )
              }
            >
              <DropdownMenuLabel className="font-thin">
                {locationsCoordinates.userLocation.lat &&
                locationsCoordinates.userLocation.lng
                  ? "Around me"
                  : "Actual location unavailable"}
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
                onClick={() => handleAreaChange(location)}
              >
                <DropdownMenuLabel className="font-thin">
                  {location}
                </DropdownMenuLabel>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem
              className="bg-greenButton flex gap-3 justify-center hover:bg-greenButtonDark text-center py-3 font-thin text-[1em] text-white cursor-pointer sticky bottom-0  font-rubik"
              onClick={handleAddNewAddress}
            >
              <FaPlus />
              Add a new address
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      {/*GIVE THE GIFT OF GOOD FOOD PART*/}
      <div className="dark:bg-black bg-white  relative flex flex-col items-center pt-[2em] min-w-[350px] lg:min-w-[450px] bg-cover bg-center shadow-inner mt-0 border-0">
        <div className="grid grid-cols-[20%_60%_20%] items-center pb-10 border-0">
          <h2 className=" col-span-3  text-[2.5em] font-rubik dark:text-white font-medium text-center md:flex-grow border-0">
            Give the gift of good food
          </h2>
          <div className="hidden w-full md:w-auto lg:flex items-center mt-4 md:mt-0">
            <ShowMore />
          </div>
        </div>

        <div>
          <div className="flex flex-wrap justify-center gap-4">
            {AllRestaurants?.slice(0, 3).map((restaurant) => (
              <GiftCard key={restaurant.restId} restaurant={restaurant} />
            ))}
          </div>

          <div className=" lg:hidden flex justify-center items-center py-4 md:mt-0">
            <ShowMore />
          </div>
        </div>
      </div>

      {/* TAKEOUT OR DELIVERY PART */}
      <div className="dark:bg-black bg-white  relative flex flex-col items-center pt-[0] min-w-[350px] lg:min-w-[450px] bg-cover bg-center shadow-inner">
        <div className="grid grid-cols-[20%_60%_20%] items-center py-10 ">
          <h2 className="w-full  col-span-3 py-7 pt-0 md:w-auto text-[2.2em] font-rubik dark:text-white font-bold text-center md:flex-grow">
            Takeout or Delivery
          </h2>
          <div className="hidden w-full md:w-auto lg:flex items-center mt-4 md:mt-0">
            <ShowMore />
          </div>
        </div>

        <div>
          <div className="flex flex-wrap justify-center gap-4">
            {AllRestaurants.slice(0, 3).map((restaurant) => (
              <RestaurantCard key={restaurant.restId} restaurant={restaurant} />
            ))}
          </div>

          <div className=" lg:hidden flex justify-center items-center py-4 md:mt-0">
            <ShowMore />
          </div>
        </div>
      </div>

      {/* NEW RESTAURANTS AT TABIT PART */}
      <div className="dark:bg-black bg-white  relative flex flex-col items-center pt-[6em] min-w-[350px] lg:min-w-[450px] bg-cover bg-center shadow-inner">
        <div className="grid grid-cols-[20%_60%_20%] items-center py-10">
          <h2 className="w-full col-start-2 py-7 md:w-auto text-[2.25em] font-rubik dark:text-white font-normal text-center md:flex-grow">
            New Restaurants at Tabit
          </h2>
          <div className=" hidden w-full md:w-auto lg:flex items-center mt-4 md:mt-0">
            <ShowMore />
          </div>
        </div>

        <div>
          <div className="flex flex-wrap justify-center gap-4">
            {AllRestaurants.slice(0, 3).map((restaurant) => (
              <RestaurantCard key={restaurant.restId} restaurant={restaurant} />
            ))}
          </div>

          <div className=" lg:hidden flex justify-center items-center py-4 md:mt-0">
            <ShowMore />
          </div>
        </div>
      </div>

      {/* NEAR ME PART */}
      <div className="dark:bg-black bg-white  relative flex flex-col items-center pt-[6em] min-w-[350px] lg:min-w-[450px] bg-cover bg-center shadow-inner">
        <div className="grid grid-cols-[20%_60%_20%] items-center py-10">
          <h2 className="w-full col-start-2 py-7 md:w-auto text-[2.25em] font-rubik dark:text-white font-normal text-center md:flex-grow">
            Near Me{" "}
          </h2>
          <div className=" hidden w-full md:w-auto lg:flex items-center mt-4 md:mt-0">
            <ShowMore />
          </div>
        </div>

        <div>
          <div className="flex flex-wrap justify-center gap-4">
            {AllRestaurants.slice(0, 3).map((restaurant) => (
              <RestaurantCard key={restaurant.restId} restaurant={restaurant} />
            ))}
          </div>

          <div className=" lg:hidden flex justify-center items-center py-4 md:mt-0">
            <ShowMore />
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
