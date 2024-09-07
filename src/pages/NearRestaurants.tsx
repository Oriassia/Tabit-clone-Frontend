import { useEffect, useState } from "react";
import api from "@/services/api.services";
import { IRestaurant } from "@/types/restaurant";
import RestaurantCard from "@/components/custom/CardsForRestaurants/RestaurantCard"; // Import your RestaurantCard component

const NearRestaurants = () => {
  const [AllRestaurants, setAllRestaurants] = useState<IRestaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllRests();
  }, []);

  async function fetchAllRests() {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get("/restaurants");
      setAllRestaurants(data);
    } catch (error) {
      setError("Failed to load restaurants.");
      console.error("Error fetching restaurants:", error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="  bg-black  ">
      <p className="  text-white text-center text-[3em] pt-[2.5em]">Near Me</p>
      <div className="flex justify-center flex-wrap gap-4 px-[7em] py-[4em]">
        {AllRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.restId} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default NearRestaurants;
