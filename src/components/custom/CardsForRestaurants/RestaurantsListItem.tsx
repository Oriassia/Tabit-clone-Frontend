import { Button } from "@/components/ui/button";
import { availabileTablesByRestaurant, IRestaurant } from "@/types/restaurant";

interface RestaurantItemProps {
  restaurant?: IRestaurant;
  restWithTables?: availabileTablesByRestaurant;
  isClicked: boolean;
}

function RestaurantsListItem({
  restWithTables,
  restaurant,
  isClicked,
}: RestaurantItemProps) {
  return (
    <div
      className={`${
        isClicked ? "dark:bg-greySelectedRestaurant" : ""
      } border-b border-slate-600 flex gap-3 py-4 px-4`}
    >
      <img
        src={restWithTables?.restaurant_mainphoto || restaurant?.mainPhoto}
        alt={restWithTables?.rest_name || restaurant?.name}
        className="rounded-md max-h-14 w-14 object-cover"
      />
      <div className="font-rubik font-normal flex flex-col gap-1">
        <div className="text-xl font-medium text-white">
          {restWithTables?.rest_name || restaurant?.name}
        </div>
        <div className="text-slate-300">
          {restWithTables?.rest_address || restaurant?.address}
        </div>

        {restWithTables && (
          <div className="flex gap-1">
            {["Hour 1", "Hour 2", "Hour 3"].map((hour, index) => (
              <Button
                key={index}
                className="dark:bg-greenReservationActive font-normal w-16 h-9 rounded-[4px]"
              >
                {hour}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RestaurantsListItem;
