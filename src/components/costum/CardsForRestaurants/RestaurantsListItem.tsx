import { Button } from "@/components/ui/button";
import { IRestaurant } from "@/types/restaurant";

interface RestaurantCardProps {
  restaurant: IRestaurant;
}

// userInput = 19:00;

// Restaurants: [{
//   rest_id: 1,
//   name: "dalal",
//   availableHours:{
//     halfHourBefore: {
//       position: [tableId,tableId,tableId...]
//       position: [tableId,tableId,tableId...]
//       position: [tableId,tableId,tableId...]
//     }
//     givenHour:{
//       available:boolean, // if at least 1 table available
//       position: [tableId,tableId,tableId...],
//       position: [], // in case no table is available
//       position: [tableId,tableId,tableId...],
//     }
//     halfHourlater:{
//       position: [tableId,tableId,tableId...]
//       position: [tableId,tableId,tableId...]
//       position: [tableId,tableId,tableId...]
//     }
//   }
// }];

function RestaurantsListItem({ restaurant }: RestaurantCardProps) {
  return (
    <div className="dark:bg-greyNavbar border-b border-slate-600 flex gap-4 py-5 px-4">
      <img
        src={restaurant.mainPhoto}
        alt={restaurant.name}
        className="rounded-md max-h-14 w-14 object-cover"
      />
      <div className="font-rubik font-normal flex flex-col gap-1">
        <div className="text-xl font-medium text-white">{restaurant.name}</div>
        <div className="text-slate-300">{restaurant.address}</div>
        <div className="flex gap-1">
          {["Hour 1", "Hour 2", "Hour 3"].map((hour) => (
            <Button className="dark:bg-greenReservationActive font-normal w-15 h-9 rounded-[4px]">
              {hour}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RestaurantsListItem;
