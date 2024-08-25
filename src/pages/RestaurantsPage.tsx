import { RestaurantsContext } from "@/context/RestaurantsContext";
import { useContext } from "react";

function RestaurantsPage() {
  const restaurantsContext = useContext(RestaurantsContext);

  if (!restaurantsContext) {
    throw new Error("useRestaurants must be used within a RestaurantsProvider");
  }

  const { restaurantsQuery } = restaurantsContext;

  if (restaurantsQuery?.isLoading) return <div>Loading...</div>;
  if (restaurantsQuery?.isError) return <div>Error loading restaurants.</div>;

  return (
    <div>
      {restaurantsQuery?.data?.map((restaurant) => (
        <div key={restaurant._Id}>{restaurant.name}</div>
      ))}
    </div>
  );
}

export default RestaurantsPage;
