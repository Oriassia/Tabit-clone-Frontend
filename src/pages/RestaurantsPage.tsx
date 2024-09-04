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
  const [searchParams, setSearchParams] = useSearchParams({
    area: "Tel Aviv-Jaffa area",
    category: "Tags",
  });
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const listItemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [clickedId, setClickedId] = useState<number | null>(null); // State for clicked restaurant

  const { usersLocation } = useUserContext();
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);

  useEffect(() => {
    setSearchParams(searchParams);
    handleSearchSubmit();
  }, []);

  const updateSearchParams = (title: string, value: string) => {
    searchParams.set(title, value);
    setSearchParams(searchParams);
  };

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
      // Default post data
      let params = {
        lat: 32.0661,
        lng: 34.7748,
        category: searchParams.get("category"),
      };

      // Handle different areas
      switch (searchParams.get("area")) {
        case "Around me":
          if (usersLocation?.lat && usersLocation?.lng) {
            params.lat = usersLocation.lat;
            params.lng = usersLocation.lng;
          } else {
            throw new Error("User location is not available.");
          }
          break;

        case "Tel Aviv-Jaffa area" || "Tags":
          params.lat = 32.0661;
          params.lng = 34.7748;
          break;

        // Add additional areas here if needed
        default:
          throw new Error("Selected area is not supported.");
      }

      // Make the API request
      const { data } = await api.get("/restaurants", { params });

      if (data.length === 0) {
        throw new Error("No tables available for the selected criteria.");
      }

      setRestaurants(data);

      // Scroll to the first available restaurant in the list
      scrollToRestaurant(data[0].restId);
      setClickedId(data[0].restId);
    } catch (error: any) {
      console.error(error);
      // Provide user feedback on the error
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

          <TagsSelector
            searchParams={searchParams}
            updateSearchParams={updateSearchParams}
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
            <div className="text-center py-4">No restaurants available</div>
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
