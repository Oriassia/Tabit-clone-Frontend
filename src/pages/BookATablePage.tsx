import RestaurantCard from "@/components/costum/CardsForRestaurants/RestaurantCard";
import {
  AreaDropdown,
  Reservation,
  ReservationSelector,
} from "@/components/costum/ReservationSelector/ReservationSelector";
import { Button } from "@/components/ui/button";
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

  const [reservation, setReservation] = useState<Reservation>({
    dateDay: "Friday",
    dateDayNumber: "23 / 08",
    time: "08:00",
    guests: 2,
    area: "Around you",
  });

  const handleAreaChange = (newArea: string) => {
    setReservation((prev) => ({ ...prev, area: newArea }));
  };

  const handlePartySizeChange = (newSize: number) => {
    setReservation((prev) => ({ ...prev, guests: newSize }));
  };
  const handleAddNewAddress = () => {
    console.log("Add a new address clicked");
  };
  return (
    <>
      <div
        className="flex flex-col lg:flex-row relative  items-center py-[2em] min-w-[350px] lg:min-w-[450px] bg-cover bg-center shadow-inner"
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
          reservation={reservation}
          onPartySizeChange={handlePartySizeChange}
        />

        <Button className="bg-greenButton dark:bg-greenButton dark:hover:bg-greenButton text-black font-rubik font-bold min-w-[350px] lg:w-[450px] py-7 text-[19px] rounded-full hover:bg-greenButton my-3">
          Find a table
        </Button>

        <AreaDropdown
          area={reservation.area}
          onAreaChange={handleAreaChange}
          onAddNewAddress={handleAddNewAddress}
        />
      </div>
      <div>
        {restaurantsQuery?.data?.map((restaurant) => (
          <RestaurantCard key={restaurant._Id} restaurant={restaurant} />
        ))}
      </div>
    </>
  );
}

export default BookATablePage;
