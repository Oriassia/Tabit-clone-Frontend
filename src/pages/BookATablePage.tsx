import RestaurantsListItem from "@/components/costum/CardsForRestaurants/RestaurantsListItem";
import NavBar from "@/components/costum/NavBar/NavBar";
import {
  AreaDropdown,
  IReservationInput,
  ReservationSelector,
} from "@/components/costum/ReservationSelector/ReservationSelector";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import api from "@/services/api.services";
import { getFormattedDate, getFormattedTime } from "@/services/timefunctions";
import { availabileTablesByRestaurant } from "@/types/restaurant";
import { useState } from "react";

function BookATablePage() {
  const thisDay = new Date();

  const [availableTablesByRest, setavailableTablesByRest] = useState<
    availabileTablesByRestaurant[]
  >([]);

  const [reservationInputData, setReservationInputData] =
    useState<IReservationInput>({
      dayName: thisDay.toLocaleDateString("en-US", { weekday: "long" }),
      dateDayNumber: getFormattedDate(thisDay),
      time: getFormattedTime(thisDay),
      guests: 2,
      area: "Around you",
    });

  const onDateChange = (newDate: Date) => {
    const dayName = newDate.toLocaleDateString("en-US", { weekday: "long" });
    const dayNumber = newDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
    });

    setReservationInputData((prevState) => ({
      ...prevState,
      dayName: dayName,
      dateDayNumber: dayNumber,
    }));
  };

  const onTimeChange = (newTime: string) => {
    setReservationInputData((prevState) => ({
      ...prevState,
      time: newTime,
    }));
  };

  const handleAreaChange = (newArea: string) => {
    setReservationInputData((prev) => ({ ...prev, area: newArea }));
  };

  const handlePartySizeChange = (newSize: number) => {
    setReservationInputData((prev) => ({ ...prev, guests: newSize }));
  };

  const handleAddNewAddress = () => {
    console.log("Add a new address clicked");
  };

  const handleSearchSubmit = async () => {
    try {
      // Parse the dateDayNumber and time
      const [day, month] = reservationInputData.dateDayNumber
        .split(" / ")
        .map(Number);
      const [hours, minutes] = reservationInputData.time.split(":").map(Number);

      const year = new Date().getFullYear(); // Assuming the current year

      // Manually format the date string without milliseconds and timezone
      const reservationDateString = `${year}-${String(month).padStart(
        2,
        "0"
      )}-${String(day).padStart(2, "0")}T${String(hours).padStart(
        2,
        "0"
      )}:${String(minutes).padStart(2, "0")}`;

      // Add the new property to reservationInputData
      const postInputData = {
        lat: 32.0661,
        lng: 34.7748,
        partySize: reservationInputData.guests,
        date: reservationDateString,
      };

      // Send the updated reservation data
      const { data } = await api.post("/tables", postInputData);
      console.log(data[0]);
      setavailableTablesByRest(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div title="page-wrapper" className="flex flex-col sm:flex-row h-full">
        <div
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

          <ReservationSelector
            reservationInputData={reservationInputData}
            onPartySizeChange={handlePartySizeChange}
            onDateChange={onDateChange}
            onTimeChange={onTimeChange}
          />

          <Button
            onClick={handleSearchSubmit}
            className="bg-greenButton dark:bg-greenButton dark:hover:bg-greenButton text-black font-rubik font-bold min-w-[350px] lg:w-[450px] py-7 text-[19px] rounded-full hover:bg-greenButton my-3"
          >
            Find a table
          </Button>

          <AreaDropdown
            area={reservationInputData.area}
            onAreaChange={handleAreaChange}
            onAddNewAddress={handleAddNewAddress}
          />
        </div>

        <ScrollArea
          aria-orientation="vertical"
          title="restaurants-list-section"
          className=" sm:w-[350px] lg:w-[450px] flex-shrink-0"
        >
          {availableTablesByRest && availableTablesByRest.length > 0 ? (
            <ul className="h-5 bg-red-500">
              {availableTablesByRest.map((restaurant) => (
                <li key={restaurant.rest_id}>
                  <RestaurantsListItem restaurant={restaurant} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-4">No restaurants available</div>
          )}
        </ScrollArea>

        <div
          title="map section"
          className="hidden sm:block sm:flex-grow w-full"
        >
          Im a MAP for Elad !!
        </div>
      </div>
    </div>
  );
}

export default BookATablePage;
