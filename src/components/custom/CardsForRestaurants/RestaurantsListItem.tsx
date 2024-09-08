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
      className={`border-b border-greyNavbar flex gap-3 py-4 px-4 ${
        isClicked ? "dark:bg-greySelectedRestaurant" : ""
      }`}
    >
      <img
        src={mainPhoto}
        alt={name}
        className="rounded-md h-20 w-20 object-cover"
      />
      <div className="font-rubik font-normal flex flex-col gap-1">
        <div className="text-2xl font-medium text-white">{name}</div>
        <div className="text-greyBorder">{address}</div>

        {restWithTables && (
          <div className="flex gap-1">
            {
              <>
                {timeSlots.map((slot) => (
                  <TimeSlotDialog
                    key={slot.label}
                    restWithTables={restWithTables}
                    slot={slot}
                  />
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
