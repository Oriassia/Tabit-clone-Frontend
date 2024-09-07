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
import { Link, useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import Spinner from "@/components/custom/Loaders/Spinner"; // Import Spinner
import { useLocationsContext } from "@/context/LocationsContext";
import InfiniteScroll from "react-infinite-scroll-component";

function BookATablePage() {
  const currentDate = new Date();
  const [availableTablesByRest, setAvailableTablesByRest] = useState<
    AvailableTablesByRestaurant[]
  >([]);
  const [clickedId, setClickedId] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [isError, setIsError] = useState<String | null>(null); // Add error state
  const { getCoordinates } = useLocationsContext();
  const listItemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [searchParams] = useSearchParams({
    dayName: currentDate.toLocaleDateString("en-GB", { weekday: "long" }),
    dateDayNumber: getFormattedDate(currentDate),
    time: getFormattedTime(currentDate),
    guests: "2",
    area: "Tel Aviv-Jaffa area",
  });

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

  useEffect(() => {
    fetchTables(true);
  }, [searchParams.get("area")]);

  const fetchTables = async (override = false) => {
    setIsLoading(true);
    setIsError(null);

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

      const params = {
        lat: 32.0661,
        lng: 34.7748,
        partySize: searchParams.get("guests") ?? "2",
        date: reservationDateString,
        page: override ? 1 : Math.floor(availableTablesByRest.length / 25) + 1,
      };

      const coordinates = getCoordinates(searchParams.get("area") || "");
      if (coordinates) {
        params.lat = coordinates.lat;
        params.lng = coordinates.lng;
      }

      const { data } = await api.get("/tables", { params });

      if (override) {
        setAvailableTablesByRest(data);
      } else {
        setAvailableTablesByRest((prev) => [...prev, ...data]);
      }
      setHasMore(data.length === 25);

      if (data.length > 0) {
        scrollToRestaurant(data[0].restId);
        setClickedId(data[0].restId);
      }
    } catch (error: any) {
      console.error(error);
      setIsError(error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const fetchMoreData = () => {
    if (hasMore) {
      fetchTables();
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

          <ReservationSelector />

          <Button
            onClick={() => fetchTables()}
            className="bg-greenButton dark:bg-greenButton dark:hover:bg-greenButton text-black font-rubik font-bold text-[19px] w-full h-14 rounded-full hover:bg-greenButton"
          >
            Find a table
          </Button>

          <AreaDropDown
            onAddNewAddress={() => console.log("Add a new address clicked")}
          />
        </div>

        {/* Rests list section */}
        <InfiniteScroll
          height={"100%"}
          className=" dark:bg-greyNavbar md:w-[300px] xl:w-[420px]"
          dataLength={availableTablesByRest.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <div className="dark:text-white h-20 content-center text-center container">
              <Spinner />
            </div>
          }
          endMessage={
            <div className="dark:text-white h-20 content-center text-center container">
              No more results...
            </div>
          }
        >
          <ul className="">
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
          </ul>
        </InfiniteScroll>

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
