import RestaurantsListItem from "@/components/custom/CardsForRestaurants/RestaurantsListItem";
import Map from "@/components/custom/Map/Map";
import NavBar from "@/components/custom/NavBar/NavBar";
import { AreaDropdown } from "@/components/custom/ReservationSelector/ReservationSelector";
import ReservationSelectorForRestsPage from "@/components/custom/ReservationSelector/ReservationSelectorForRestsPage";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/UserContext";
import api from "@/services/api.services";
import { IRestaurant } from "@/types/restaurant";
import { useRef, useState } from "react";

export interface IInputData {
  category: string;
  area: string;
}

function RestaurantsPage() {
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const listItemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [clickedId, setClickedId] = useState<number | null>(null); // State for clicked restaurant

  const { usersLocation } = useUserContext();
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [InputData, setInputData] = useState({
    category: "Tags",
    area: "Tel Aviv-Jaffa area",
  });

  const handleCategoryChange = (newSize: number) => {
    setRestaurants((prev) => ({ ...prev, guests: newSize }));
  };

  const handleAreaChange = (newArea: string) => {
    setInputData((prev) => ({ ...prev, area: newArea }));
  };

  const handleAddNewAddress = () => {
    console.log("Add a new address clicked");
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
      let postInputData = {
        lat: 32.0661,
        lng: 34.7748,
        category: InputData.category,
      };

      // Handle different areas
      switch (InputData.area) {
        case "Tags":
          break;

        case "Around me":
          if (usersLocation?.lat && usersLocation?.lng) {
            postInputData.lat = usersLocation.lat;
            postInputData.lng = usersLocation.lng;
          } else {
            throw new Error("User location is not available.");
          }
          break;

        case "Tel Aviv-Jaffa area":
          postInputData.lat = 32.0661;
          postInputData.lng = 34.7748;
          break;

        // Add additional areas here if needed
        default:
          throw new Error("Selected area is not supported.");
      }

      // Make the API request
      const { data } = await api.get("/restaurants");

      if (data.length === 0) {
        throw new Error("No tables available for the selected criteria.");
      }

      setRestaurants(data[0]);

      // Scroll to the first available restaurant in the list
      scrollToRestaurant(data[0][0].restId);
      setClickedId(data[0][0].restId);
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
        className="h-full flex flex-col sm:flex-row overflow-hidden"
      >
        {/* Reserve a table section */}
        <div
          title="reserve-a-table-section"
          className="flex flex-col text-center items-center justify-center px-12 bg-cover bg-center shadow-inner"
          style={{
            backgroundImage: `
              linear-gradient(to bottom, 
              rgba(0, 0, 0, 0.7), 
              rgba(0, 0, 0, 0.5) 60%, 
              rgba(0, 0, 0, 0.3) 100%
              ),
              url('https://tabitisrael.co.il/assets/images/dashboard-desktop.jpg?v=4_11_1')
            `,
            boxShadow: "inset 0 0 1rem #000",
          }}
        >
          <h1 className="lg:text-[3.55em] text-[2.7em] text-white font-rubik font-normal pt-14">
            Reserve a table!
          </h1>
          <p className="pb-4 text-white font-rubik px-[2.8em] lg:px-0 lg:text-[1.5em] min-w-[350px] lg:max-w-[450px] text-center">
            Just say when and which restaurant, and the rest is on us
          </p>

          <ReservationSelectorForRestsPage
            InputData={InputData}
            handleCategoryChange={handleCategoryChange}
          />

          <Button
            onClick={handleSearchSubmit}
            className="bg-greenButton dark:bg-greenButton dark:hover:bg-greenButton text-black font-rubik font-bold min-w-[350px] lg:w-[450px] py-7 text-[19px] rounded-full hover:bg-greenButton my-3"
          >
            Find a table
          </Button>

          <AreaDropdown
            area={InputData.area}
            onAreaChange={handleAreaChange}
            onAddNewAddress={handleAddNewAddress}
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
                  <RestaurantsListItem
                    restaurant={restaurant}
                    isClicked={isClicked(restaurant.restId)}
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
        <div title="map section" className="hidden sm:block sm:flex-grow ">
          <Map restaurants={restaurants} onClickFun={scrollToRestaurant} />
        </div>
      </div>
    </div>
  );
}

export default RestaurantsPage;
