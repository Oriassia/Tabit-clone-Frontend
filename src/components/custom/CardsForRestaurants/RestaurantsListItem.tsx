import {
  AvailableTablesByRestaurant,
  IRestaurant,
  TimeSlot,
} from "@/types/restaurant";
import TimeSlotDialog from "../dialogs/TimeSlot";

interface RestaurantItemProps {
  searchedTime?: string;
  restaurant?: IRestaurant;
  restWithTables?: AvailableTablesByRestaurant;
  isClicked: boolean;
}

function RestaurantsListItem({
  restWithTables,
  restaurant,
  isClicked,
  searchedTime,
}: RestaurantItemProps) {
  const name = restWithTables?.name || restaurant?.name;
  const address = restWithTables?.address || restaurant?.address;
  const mainPhoto = restWithTables?.mainPhoto || restaurant?.mainPhoto;

  const timeSlots: TimeSlot[] = [
    { label: "Half Hour Before", data: restWithTables?.half_hour_before },
    { label: "Given Hour", data: restWithTables?.given_hour },
    { label: "Half Hour After", data: restWithTables?.half_hour_after },
  ];

  return (
    <div
      className={`border-b border-slate-600 flex gap-3 py-4 px-4 ${
        isClicked ? "dark:bg-greySelectedRestaurant" : ""
      }`}
    >
      <img
        src={mainPhoto}
        alt={name}
        className="rounded-md max-h-14 w-14 object-cover"
      />
      <div className="font-rubik font-normal flex flex-col gap-1">
        <div className="text-xl font-medium text-white">{name}</div>
        <div className="text-slate-300">{address}</div>

        {restWithTables && searchedTime && (
          <div className="flex gap-1">
            {
              <>
                {timeSlots.map((slot) => (
                  <TimeSlotDialog key={slot.label} slot={slot} />
                ))}
              </>
            }
          </div>
        )}
      </div>
    </div>
  );
}

export default RestaurantsListItem;
