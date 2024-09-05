import RestaurantsListItem from "@/components/custom/CardsForRestaurants/RestaurantsListItem";
import Map from "@/components/custom/Map/Map";
import NavBar from "@/components/custom/NavBar/NavBar";
import AreaDropDown from "@/components/custom/ReservationSelector/AreaDropDown";
import TagsSelector from "@/components/custom/ReservationSelector/TagsSelector";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/UserContext";
import api from "@/services/api.services";
import { IRestaurant } from "@/types/restaurant";
import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function RestaurantsPage() {
  const [searchParams] = useSearchParams({
    area: "Tel Aviv-Jaffa area",
  });
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const listItemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [clickedId, setClickedId] = useState<number | null>(null);
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [filtersOptions, setFiltersOptions] = useState({
    lat: 32.0661,
    lng: 34.7748,
    category: searchParams.get("category") || null,
    name: searchParams.get("filterRestName") || null,
  });
  const [fetchData, setFetchData] = useState(false); // Track if search was initiated

  const { usersLocation } = useUserContext();

  useEffect(() => {
    // Define default lat and lng values
    let lat = 32.0661;
    let lng = 34.7748;

    // Check the area value from searchParams
    const area = searchParams.get("area");
    switch (area) {
      case "Around me":
        if (usersLocation?.lat && usersLocation?.lng) {
          lat = usersLocation.lat;
          lng = usersLocation.lng;
        } else {
          throw new Error("User location is not available.");
        }
        break;

      case "Tel Aviv-Jaffa area":
        lat = 32.0661;
        lng = 34.7748;
        break;

      // Handle additional areas if needed
      default:
        break;
    }

    // Update state with the calculated values
    setFiltersOptions((prev) => ({
      ...prev,
      category: searchParams.get("category"),
      name: searchParams.get("filterRestName"),
      lat,
      lng,
    }));
  }, [searchParams, usersLocation]);

  useEffect(() => {
    if (fetchData) {
      handleSearchSubmit();
      setFetchData(false); // Reset the fetchData flag
    }
  }, [fetchData]); // Only trigger when fetchData changes

  const scrollToRestaurant = (restId: number) => {
    const targetIndex = restaurants.findIndex(
      (restaurant) => restaurant.restId === restId
    );

    if (targetIndex !== -1 && listItemRefs.current[targetIndex]) {
      listItemRefs.current[targetIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setClickedId(restaurants[targetIndex].restId);
    }
  };

  function isClicked(restId: number) {
    return clickedId == restId;
  }

  const handleSearchSubmit = async () => {
    try {
      const { data } = await api.get("/restaurants", {
        params: filtersOptions,
      });

      if (data.length === 0) {
        throw new Error("No restaurants available.");
      }

      setRestaurants(data);
      scrollToRestaurant(data[0].restId);
      setClickedId(data[0].restId);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "An unexpected error occurred. Please try again.");
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
          <div className="text-3xl text-white font-rubik font-normal pt-14">
            Reserve a table!
          </div>
          <div className=" text-white font-rubik w-full text-center">
            Search for a table at Tabit restaurants
          </div>

          <TagsSelector />

          <Button
            onClick={() => setFetchData(true)} // Trigger data fetch on button click
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
          {restaurants && restaurants.length > 0 ? (
            <ul className="flex flex-col h-full overflow-auto custom-scrollbar">
              {restaurants.map((restaurant, index) => (
                <li
                  key={restaurant.restId}
                  ref={(el) => (listItemRefs.current[index] = el)}
                >
                  <Link to={`/restaurants/${restaurant.restId}`}>
                    <RestaurantsListItem
                      restaurant={restaurant}
                      isClicked={isClicked(restaurant.restId)}
                    />
                  </Link>
                </li>
              ))}
              <li className="dark:text-white min-h-20 h-full content-center text-center container">
                No more results...
              </li>
            </ul>
          ) : (
            <div className="dark:text-white min-h-20 h-full content-center text-center container">
              No restaurants available
            </div>
          )}
        </div>

        {/* MAP section */}
        <div title="map section" className="hidden sm:block sm:flex-grow ">
          <Map restaurants={restaurants} onClickFun={scrollToRestaurant} />
        </div>
      </div>
    </div>
  );
}

export default RestaurantsPage;
