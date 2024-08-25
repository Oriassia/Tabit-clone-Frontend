import { Button } from "@/components/ui/button";
import { useState } from "react";
import GiftCard from "@/components/costum/CardsForRestaurants/GiftCard";
import ShowMore from "@/components/costum/CardsForRestaurants/ShowMore";
import RestaurantCard from "@/components/costum/CardsForRestaurants/RestaurantCard";
import {
  ReservationSelector,
  Reservation,
  ReservationSelectorProps, AreaDropdown
} from "@/components/costum/ReservationSelector/ReservationSelector";

function LandingPage() {
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
      {/*RESERVATION PART*/}
      <section
        className="relative flex flex-col items-center py-[3em] min-w-[400px] lg:min-w-[450px] bg-cover bg-center shadow-inner"
        style={{
          backgroundImage: `
          linear-gradient(to bottom, 
            rgba(0, 0, 0, 0.7), 
            rgba(0, 0, 0, 0.5) 60%, 
            rgba(0, 200, 200, 1) 100%
          ),
          url('https://tabitisrael.co.il/assets/images/dashboard-desktop.jpg?v=4_11_1')
        `,
          boxShadow: "inset 0 0 1rem #000",
        }}
      >
        <h1 className="lg:text-[3.55em] text-[2.7em] text-white font-rubik font-normal pt-14">
          Reserve a table!
        </h1>
        <p className="pb-4 text-white font-rubik px-[2.8em] lg:px-0 lg:text-[1.5em] w-[400px] lg:max-w-[450px] text-center">
          Just say when and which restaurant, and the rest is on us
        </p>

        <ReservationSelector
          reservation={reservation}
          onPartySizeChange={handlePartySizeChange}
        />

        <Button className="bg-greenButton dark:bg-greenButton dark:hover:bg-greenButton text-black font-rubik font-bold w-[400px] lg:w-[450px] py-7 text-[19px] rounded-full hover:bg-greenButton my-3">
          Find a table
        </Button>

        <AreaDropdown
          area={reservation.area}
          onAreaChange={handleAreaChange}
          onAddNewAddress={handleAddNewAddress}
        />
      </section>

      {/*GIVE THE GIFT OF GOOD FOOD PART*/}
      <div className="dark:bg-black bg-white">
        <div className="grid grid-cols-[20%_60%_20%] items-center py-10">
          <h2 className=" col-start-2 py-7 text-[2.5em] font-rubik dark:text-white font-medium text-center md:flex-grow">
            Give the gift of good food
          </h2>
          <div className="hidden w-full md:w-auto lg:flex items-center mt-4 md:mt-0">
            <ShowMore />
          </div>
        </div>

        <div>
          <div className="flex flex-wrap justify-center gap-4">
            <GiftCard
              image="https://loyaltycdn.blob.core.windows.net/accountstorage/1893/GiftCard/cardImage.jpg?v=1719740044"
              title="MASHAV Food Trucks"
              location="Bnei Brak"
              buttonLabel="Get a gift card"
              linkLabel="More information"
              linkUrl="/more-info-1"
            />
            <GiftCard
              image="https://loyaltycdn.blob.core.windows.net/accountstorage/1893/GiftCard/cardImage.jpg?v=1719740044"
              title="Restaurant TLV"
              location="Tel Aviv, 11 St"
              buttonLabel="Get a gift card"
              linkLabel="More information"
              linkUrl="/more-info-2"
            />
            <GiftCard
              image="https://loyaltycdn.blob.core.windows.net/accountstorage/1893/GiftCard/cardImage.jpg?v=1719740044"
              title="Restaurant Haifa"
              location="Haifa, 26 St"
              buttonLabel="Get a gift card"
              linkLabel="More information"
              linkUrl="/more-info-3"
            />
          </div>

          <div className=" lg:hidden flex justify-center items-center py-4 md:mt-0">
            <ShowMore />
          </div>
        </div>
      </div>

      {/* TAKEOUT OR DELIVERY PART */}
      <div className="dark:bg-black bg-white">
        <div className="grid grid-cols-[20%_60%_20%] items-center py-10">
          <h2 className="w-full  col-start-2 py-7 md:w-auto text-[2.25em] font-rubik dark:text-white font-normal text-center md:flex-grow">
            Takeout or Delivery{" "}
          </h2>
          <div className="hidden w-full md:w-auto lg:flex items-center mt-4 md:mt-0">
            <ShowMore />
          </div>
        </div>

        <div>
          <div className="flex flex-wrap justify-center gap-4">
            <RestaurantCard
              image="https://loyaltycdn.blob.core.windows.net/accountstorage/1893/GiftCard/cardImage.jpg?v=1719740044"
              title="MASHAV Food Trucks"
              categories="Meat | Hamburger"
              description="Short Description"
              distance="5 km"
              address="123 Main St"
            />
            <RestaurantCard
              image="https://loyaltycdn.blob.core.windows.net/accountstorage/1893/GiftCard/cardImage.jpg?v=1719740044"
              title="Gourmet Burgers"
              categories="Burger | Fast Food"
              description="Short Description"
              distance="2 km"
              address="456 Elm St"
            />
            <RestaurantCard
              image="https://loyaltycdn.blob.core.windows.net/accountstorage/1893/GiftCard/cardImage.jpg?v=1719740044"
              title="Fancy Steakhouse"
              categories="Steak | Fine Dining"
              description="Short Description"
              distance="10 km"
              address="789 Oak St"
            />
          </div>

          <div className=" lg:hidden flex justify-center items-center py-4 md:mt-0">
            <ShowMore />
          </div>
        </div>
      </div>

      {/* NEW RESTAURANTS AT TABIT PART */}
      <div className="dark:bg-black bg-white">
        <div className="grid grid-cols-[20%_60%_20%] items-center py-10">
          <h2 className="w-full col-start-2 py-7 md:w-auto text-[2.25em] font-rubik dark:text-white font-normal text-center md:flex-grow">
            New Restaurants at Tabit
          </h2>
          <div className=" hidden w-full md:w-auto lg:flex items-center mt-4 md:mt-0">
            <ShowMore />
          </div>
        </div>

        <div>
          <div className="flex flex-wrap justify-center gap-4">
            <RestaurantCard
              image="https://loyaltycdn.blob.core.windows.net/accountstorage/1893/GiftCard/cardImage.jpg?v=1719740044"
              title="MASHAV Food Trucks"
              categories="Meat | Hamburger"
              description="Short Description"
              distance="5 km"
              address="123 Main St"
            />
            <RestaurantCard
              image="https://loyaltycdn.blob.core.windows.net/accountstorage/1893/GiftCard/cardImage.jpg?v=1719740044"
              title="Gourmet Burgers"
              categories="Burger | Fast Food"
              description="Short Description"
              distance="2 km"
              address="456 Elm St"
            />
            <RestaurantCard
              image="https://loyaltycdn.blob.core.windows.net/accountstorage/1893/GiftCard/cardImage.jpg?v=1719740044"
              title="Fancy Steakhouse"
              categories="Steak | Fine Dining"
              description="Short Description"
              distance="10 km"
              address="789 Oak St"
            />
          </div>

          <div className=" lg:hidden flex justify-center items-center py-4 md:mt-0">
            <ShowMore />
          </div>
        </div>
      </div>

      {/* NEAR ME PART */}
      <div className="dark:bg-black bg-white pb-12">
        <div className="grid grid-cols-[20%_60%_20%] items-center py-10">
          <h2 className="w-full col-start-2 py-7 md:w-auto text-[2.25em] font-rubik dark:text-white font-normal text-center md:flex-grow">
            Near Me{" "}
          </h2>
          <div className=" hidden w-full md:w-auto lg:flex items-center mt-4 md:mt-0">
            <ShowMore />
          </div>
        </div>

        <div>
          <div className="flex flex-wrap justify-center gap-4">
            <RestaurantCard
              image="https://loyaltycdn.blob.core.windows.net/accountstorage/1893/GiftCard/cardImage.jpg?v=1719740044"
              title="MASHAV Food Trucks"
              categories="Meat | Hamburger"
              description="Short Description"
              distance="5 km"
              address="123 Main St"
            />
            <RestaurantCard
              image="https://loyaltycdn.blob.core.windows.net/accountstorage/1893/GiftCard/cardImage.jpg?v=1719740044"
              title="Gourmet Burgers"
              categories="Burger | Fast Food"
              description="Short Description"
              distance="2 km"
              address="456 Elm St"
            />
            <RestaurantCard
              image="https://loyaltycdn.blob.core.windows.net/accountstorage/1893/GiftCard/cardImage.jpg?v=1719740044"
              title="Fancy Steakhouse"
              categories="Steak | Fine Dining"
              description="Short Description"
              distance="10 km"
              address="789 Oak St"
            />
          </div>

          <div className=" lg:hidden flex justify-center items-center py-4 md:mt-0">
            <ShowMore />
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
