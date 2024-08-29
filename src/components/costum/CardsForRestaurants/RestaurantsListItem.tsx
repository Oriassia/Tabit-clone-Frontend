import { Button } from "@/components/ui/button";
import { availabileTablesByRestaurant } from "@/types/restaurant";

interface RestaurantItemProps {
  restaurant: availabileTablesByRestaurant;
  isClicked: boolean;
}

function RestaurantsListItem({ restaurant, isClicked }: RestaurantItemProps) {
  return (

    <div
      className={`${
        !isClicked ? "dark:bg-greyNavbar" : "dark:bg-greySelectedRestaurant"
      } border-b border-slate-600 flex gap-4 py-5 px-4`}
    >
      <img
        src={restaurant.restaurant_mainphoto}
        alt={restaurant.rest_name}
        className="rounded-md max-h-14 w-14 object-cover"
      />
      <div className="font-rubik font-normal flex flex-col gap-1">
        <div className="text-xl font-medium text-white">
          {restaurant.rest_name}
        </div>
        <div className="text-slate-300">{restaurant.rest_address}</div>
        <div className="flex gap-1">
          {["Hour 1", "Hour 2", "Hour 3"].map((hour, index) => (
            <Button
              key={index}
              className="dark:bg-greenReservationActive font-normal w-15 h-9 rounded-[4px]"
            >
              {hour}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RestaurantsListItem;
