import { Button } from "@/components/ui/button";
import { availabileTablesByRestaurant, IRestaurant } from "@/types/restaurant";

interface RestaurantItemProps {
  searchedTime?: string;
  restaurant?: IRestaurant;
  restWithTables?: availabileTablesByRestaurant;
  isClicked: boolean;
}

function calculateTimeSlots(searchedTime: string): string[] {
  const [hours, minutes] = searchedTime.split(":").map(Number);

  const createDateTime = (h: number, m: number) =>
    new Date().setHours(h, m, 0, 0);

  const searchedDateTime = createDateTime(hours, minutes);
  const beforeTime = new Date(searchedDateTime).setMinutes(minutes - 30);
  const afterTime = new Date(searchedDateTime).setMinutes(minutes + 30);

  return [
    new Date(beforeTime).toTimeString().slice(0, 5),
    searchedTime,
    new Date(afterTime).toTimeString().slice(0, 5),
  ];
}

function isButtonDisabled(
  index: number,
  restWithTables: availabileTablesByRestaurant
): boolean {
  const availabilityMap = [
    restWithTables.half_hour_before.available,
    restWithTables.given_hour.available,
    restWithTables.half_hour_after.available,
  ];
  return availabilityMap[index] !== 1;
}

function RestaurantsListItem({
  restWithTables,
  restaurant,
  isClicked,
  searchedTime,
}: RestaurantItemProps) {
  const name = restWithTables?.rest_name || restaurant?.name;
  const address = restWithTables?.rest_address || restaurant?.address;
  const mainPhoto =
    restWithTables?.restaurant_mainphoto || restaurant?.mainPhoto;

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
            {calculateTimeSlots(searchedTime).map((time, index) => (
              <Button
                key={index}
                disabled={isButtonDisabled(index, restWithTables)}
                variant={
                  isButtonDisabled(index, restWithTables)
                    ? "outline"
                    : "default"
                }
                className=" font-normal w-16 h-9 rounded-[4px]"
              >
                {time}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RestaurantsListItem;
