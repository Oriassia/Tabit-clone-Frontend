import RestaurantsListItem from "@/components/custom/CardsForRestaurants/RestaurantsListItem";
import Map from "@/components/custom/Map/Map";
import NavBar from "@/components/custom/NavBar/NavBar";
import AreaDropDown from "@/components/custom/ReservationSelector/AreaDropDown";
import { ReservationSelector } from "@/components/custom/ReservationSelector/ReservationSelector";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/UserContext";
import api from "@/services/api.services";
import { getFormattedDate, getFormattedTime } from "@/services/timefunctions";
import { AvailableTablesByRestaurant } from "@/types/restaurant";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";

function BookATablePage() {
  const currentDate = new Date();
  const [availableTablesByRest, setAvailableTablesByRest] = useState<
    AvailableTablesByRestaurant[]
  >([]);
  const [clickedId, setClickedId] = useState<number | null>(null);
  const [searchParams, setSearchParams] = useSearchParams({
    dayName: currentDate.toLocaleDateString("en-GB", { weekday: "long" }),
    dateDayNumber: getFormattedDate(currentDate),
    time: getFormattedTime(currentDate),
    guests: "2",
    area: "Tel Aviv-Jaffa area",
  });
  const { usersLocation } = useUserContext();
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const listItemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    setSearchParams(searchParams);
    handleSearchSubmit();
  }, []);

  const updateSearchParams = (key: string, value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  };

  const onDateChange = (newDate: Date) => {
    updateSearchParams(
      "dayName",
      newDate.toLocaleDateString("en-GB", { weekday: "long" })
    );
    updateSearchParams("dateDayNumber", getFormattedDate(newDate));
  };

  const handleSearchSubmit = async () => {
    try {
      const [day, month] = (searchParams.get("dateDayNumber") ?? "")
        .split("/")
        .map(Number);
      const [hours, minutes] = (searchParams.get("time") ?? "")
        .split(":")
        .map(Number);

      if (isNaN(day) || isNaN(month) || isNaN(hours) || isNaN(minutes)) {
        throw new Error("Invalid date or time format.");
      }

      const currentDate = new Date();
      const reservationDate = new Date(
        currentDate.getFullYear(),
        month - 1,
        day,
        hours,
        minutes
      );

      if (reservationDate < currentDate) {
        throw new Error("Reservation date and time cannot be in the past.");
      }

      const reservationDateString = format(
        reservationDate,
        "yyyy-MM-dd'T'HH:mm"
      ); // Remove milliseconds and trailing "Z"

      const postInputData = {
        lat: 32.0661,
        lng: 34.7748,
        partySize: searchParams.get("guests") ?? "2",
        date: reservationDateString,
      };

      if (searchParams.get("area") === "Around me") {
        if (usersLocation?.lat && usersLocation?.lng) {
          postInputData.lat = usersLocation.lat;
          postInputData.lng = usersLocation.lng;
        } else {
          throw new Error("User location is not available.");
        }
      }

      const { data } = await api.post("/tables", postInputData);

      if (!data.length) {
        throw new Error("No tables available for the selected criteria.");
      }

      setAvailableTablesByRest(data);
      scrollToRestaurant(data[0].restId);
      setClickedId(data[0].restId);
    } catch (error: any) {
      console.error(error);
      error.message || "An unexpected error occurred. Please try again.";
    }
  };

  const scrollToRestaurant = (restId: number) => {
    const targetIndex = availableTablesByRest.findIndex(
      (restaurant) => restaurant.restId === restId
    );

    if (targetIndex !== -1 && listItemRefs.current[targetIndex]) {
      listItemRefs.current[targetIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setClickedId(restId);
    }
  };

  return (
    <div title="page-wrapper" className="h-screen flex flex-col">
      <NavBar />
      <div
        title="content-wrapper"
        className="h-full flex flex-col sm:flex-row sm:overflow-hidden"
      >
        {/* Reserve a table section */}
        <div
          title="reserve-a-table-section"
          className="flex flex-col gap-5 px-10 sm:w-[470px] text-center items-center justify-center bg-cover bg-center shadow-inner reserve-section"
        >
          <div>
            <div className="text-4xl text-white font-rubik font-normal pt-14">
              Reserve a table!
            </div>
            <div className="font-medium text-lg text-white font-rubik w-full text-center">
              Search for a table at Tabit restaurants
            </div>
          </div>

          <ReservationSelector
            onDateChange={onDateChange}
            updateSearchParams={updateSearchParams}
            searchParams={searchParams}
          />

          <Button
            onClick={handleSearchSubmit}
            className="bg-greenButton dark:bg-greenButton dark:hover:bg-greenButton text-black font-rubik font-bold text-[19px] w-full h-14 rounded-full hover:bg-greenButton"
          >
            Find a table
          </Button>

          <AreaDropDown
            searchParams={searchParams}
            updateSearchParams={updateSearchParams}
            onAddNewAddress={() => console.log("Add a new address clicked")}
          />
        </div>

        <div className="dark:bg-greyNavbar flex flex-col">
          {availableTablesByRest.length > 0 ? (
            <ul className="flex flex-col h-full overflow-auto custom-scrollbar">
              {availableTablesByRest.map((restWithTables, index) => (
                <li
                  key={restWithTables.restId}
                  ref={(el) => (listItemRefs.current[index] = el)}
                >
                  <RestaurantsListItem
                    restWithTables={restWithTables}
                    isClicked={clickedId === restWithTables.restId}
                  />
                </li>
              ))}
              <li className="dark:text-white min-h-20 h-full content-center text-center container">
                No more results...
              </li>
            </ul>
          ) : (
            <div className="text-center py-4">No restaurants available</div>
          )}
        </div>

        <div title="map section" className="hidden sm:block flex-grow">
          <Map
            restaurants={availableTablesByRest}
            onClickFun={scrollToRestaurant}
          />
        </div>
      </div>
    </div>
  );
}

export default BookATablePage;
