import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import api from "@/services/api.services";
import { IRestaurant } from "@/types/restaurant";
import RestaurantsListItem from "@/components/custom/CardsForRestaurants/RestaurantsListItem";
import Spinner from "@/components/custom/Loaders/Spinner";
import Map from "@/components/custom/Map/Map";
import NavBar from "@/components/custom/NavBar/NavBar";
import AreaDropDown from "@/components/custom/ReservationSelector/AreaDropDown";
import TagsSelector from "@/components/custom/ReservationSelector/TagsSelector";
import { Button } from "@/components/ui/button";
import { useLocationsContext } from "@/context/LocationsContext";

function RestaurantsPage() {
  const [searchParams] = useSearchParams();
  const { getCoordinates } = useLocationsContext();
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<String | null>(null);
  const [clickedId, setClickedId] = useState<number | null>(null);
  const listItemRefs = useRef<(HTMLLIElement | null)[]>([]);

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

  const fetchRestaurants = async (override = false) => {
    setIsLoading(true);
    setError(null);

    const params = {
      area: searchParams.get("area") || "",
      category: searchParams.get("category"),
      name: searchParams.get("filterRestName"),
      lat: 32.0661, // Default latitude
      lng: 34.7748, // Default longitude
      page: override ? 1 : Math.floor(restaurants.length / 25) + 1,
    };

    // Update lat and lng based on user's location or selected area

    const coordinates = getCoordinates(params.area);
    if (coordinates) {
      params.lat = coordinates?.lat;
      params.lng = coordinates?.lng;
    }

    try {
      const { data } = await api.get("/restaurants/", { params });
      if (override) {
        setRestaurants(data);
      } else {
        setRestaurants((prev) => [...prev, ...data]);
      }
      setHasMore(data.length === 25);

      if (data.length > 0) {
        scrollToRestaurant(data[0].restId);
        setClickedId(data[0].restId);
      }
    } catch (err: any) {
      setError("Failed to load data. Please try again.");
      console.error("Failed to fetch restaurants:", err);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchRestaurants(true); // Initial fetch with override to reset page count
  }, [searchParams]);

  const fetchMoreData = () => {
    if (hasMore) {
      fetchRestaurants();
    }
  };

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div title="page-wrapper" className="h-screen flex flex-col ">
      <NavBar />
      <div
        title="content-wrapper"
        className="flex flex-col sm:flex-row h-full sm:overflow-hidden"
      >
        <div
          title="reserve-a-table-section"
          className="flex flex-col gap-5 px-10 sm:w-[370px] lg:w-[450px] text-center items-center justify-center bg-cover bg-center shadow-inner reserve-section"
        >
          <div className="text-4xl text-white font-rubik font-normal pt-14">
            Where do you want to hang out?
          </div>
          <div className="text-white font-rubik w-full text-center text-lg">
            Reserve a table quickly and easily at one of the country's best
            restaurants{" "}
          </div>
          <div className="flex lg:w-[400px]  flex-col items-center gap-3">
            <TagsSelector />
            <Button
              onClick={() => fetchRestaurants(true)}
              disabled={isLoading}
              className="bg-greenButton text-black font-rubik font-bold text-[19px] w-full h-14 rounded-full hover:bg-greenButton"
            >
              {isLoading ? "Loading..." : "Search"}
            </Button>
            <AreaDropDown />
          </div>
        </div>

        <InfiniteScroll
          height={"100%"}
          className=" dark:bg-greyBg md:w-[300px] xl:w-[420px] scrollbar-none"
          dataLength={restaurants.length}
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
            {restaurants.map((restaurant, index) => (
              <li
                key={restaurant.restId}
                ref={(el) => (listItemRefs.current[index] = el)}
              >
                <Link to={`/restaurants/${restaurant.restId}`}>
                  <RestaurantsListItem
                    restaurant={restaurant}
                    isClicked={clickedId === restaurant.restId}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </InfiniteScroll>

        <div title="map section" className="hidden sm:block sm:flex-grow">
          <Map restaurants={restaurants} onClickFun={scrollToRestaurant} />
        </div>
      </div>
    </div>
  );
}

export default RestaurantsPage;
