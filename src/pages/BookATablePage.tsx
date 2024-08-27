import RestaurantsListItem from "@/components/costum/CardsForRestaurants/RestaurantsListItem";
import NavBar from "@/components/costum/NavBar/NavBar";
import {
  AreaDropdown,
  IReservationInput,
  ReservationSelector,
} from "@/components/costum/ReservationSelector/ReservationSelector";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RestaurantsContext } from "@/context/RestaurantsContext";
import { useContext, useState } from "react";

function BookATablePage() {
  const restaurantsContext = useContext(RestaurantsContext);

  if (!restaurantsContext) {
    throw new Error("useRestaurants must be used within a RestaurantsProvider");
  }

  const { restaurantsQuery } = restaurantsContext;

  if (restaurantsQuery?.isLoading) return <div>Loading...</div>;
  if (restaurantsQuery?.isError) return <div>Error loading restaurants.</div>;

  const [reservationInputData, setReservationInputData] =
    useState<IReservationInput>({
      dateDay: "Friday",
      dateDayNumber: "23 / 08",
      time: "08:00",
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
      dateDay: dayName,
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

  const restaurantsData = restaurantsQuery?.data;

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

          <Button className="bg-greenButton dark:bg-greenButton dark:hover:bg-greenButton text-black font-rubik font-bold min-w-[350px] lg:w-[450px] py-7 text-[19px] rounded-full hover:bg-greenButton my-3">
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
          {restaurantsData && restaurantsData.length > 0 ? (
            <ul className="h-5 bg-red-500">
              {restaurantsData.map((restaurant) => (
                <li key={restaurant.restId}>
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
