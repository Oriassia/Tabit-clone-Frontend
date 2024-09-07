import RestaurantsListItem from "@/components/custom/CardsForRestaurants/RestaurantsListItem";
import Map from "@/components/custom/Map/Map";
import NavBar from "@/components/custom/NavBar/NavBar";
import AreaDropDown from "@/components/custom/ReservationSelector/AreaDropDown";
import { ReservationSelector } from "@/components/custom/ReservationSelector/ReservationSelector";
import { Button } from "@/components/ui/button";
import api from "@/services/api.services";
import { getFormattedDate, getFormattedTime } from "@/services/time.services";
import { AvailableTablesByRestaurant } from "@/types/restaurant";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import Spinner from "@/components/custom/Loaders/Spinner"; // Import Spinner
import { useLocationsContext } from "@/context/LocationsContext";

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
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [isError, setIsError] = useState(false); // Add error state
  const { getCoordinates } = useLocationsContext();
  const listItemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    handleSearchSubmit();
  }, [searchParams]);

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
    setIsLoading(true); // Set loading state
    setIsError(false); // Reset error state

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
      );

      const postInputData = {
        lat: 32.0661,
        lng: 34.7748,
        partySize: searchParams.get("guests") ?? "2",
        date: reservationDateString,
      };

      const coordinates = getCoordinates(searchParams.get("area") || "");
      if (coordinates) {
        postInputData.lat = coordinates.lat;
        postInputData.lng = coordinates.lng;
      }

      const { data } = await api.get("/tables", { params: postInputData });

      if (!data.length) {
        throw new Error("No tables available for the selected criteria.");
      }

      setAvailableTablesByRest(data);
      scrollToRestaurant(data[0].restId);
      setClickedId(data[0].restId);
    } catch (error: any) {
      console.error(error);
      setIsError(true); // Set error state
    } finally {
      setIsLoading(false); // Reset loading state
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
            onAddNewAddress={() => console.log("Add a new address clicked")}
          />
        </div>

        {/* Rests list section */}
        <div className="dark:bg-greyNavbar flex flex-col md:w-[300px] xl:w-[420px] flex-shrink-0">
          {isLoading ? (
            <div className="text-white flex flex-col gap-4 items-center mt-10 h-full">
              <Spinner />
            </div>
          ) : isError ? (
            <div className="text-center py-4">
              There was an error. Please try again.
            </div>
          ) : availableTablesByRest.length > 0 ? (
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

        {/* MAP section */}
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
