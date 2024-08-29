import { useState } from "react";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineWatchLater } from "react-icons/md";
import { AreaDropdown } from "../components/costum/ReservationSelector/ReservationSelector";
import CalendarIcon from "@/components/costum/svg/CalendarIcon";
import LockIcon from "@/components/costum/svg/LockIcon";

const RestaurantDetailsPage: React.FC = () => {
  // Define the state for area selection
  const [reservationInputData, setReservationInputData] = useState({
    area: "Tel Aviv-Jaffa area",
  });

  const handleAreaChange = (newArea: string) => {
    setReservationInputData({ ...reservationInputData, area: newArea });
  };

  const handleAddNewAddress = () => {
    // Handle adding a new address (you can customize this function as needed)
    console.log("Add a new address clicked");
  };

  return (
    <div className="bg-greyBg font-rubik text-white min-h-screen lg:pt-20 pt-[4.2em]">
      {/* Restaurant Info */}
      <div>
        <div
          className="text-[16px] w-full text-white py-2 px-3"
          style={{ background: "#616161" }}
        >
          <div className="flex gap-1">
            <p>הזמנת-מקום</p>
            <p>-</p>
            <p>טאביט</p>
          </div>
          <div className="flex gap-1 ">
            <p className="underline">Restaurants</p>
            <p className="">&gt;</p>
            <p className="underline">restaurantName</p>
          </div>
        </div>
        {/* Image */}
        <div className="">
          <img
            src="https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Restaurant"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="px-3 py-5" style={{ background: "#303030" }}>
          <h1 className="text-5xl font-medium ">Name</h1>
          <p className="text-lg text-gray-400 py-3 ">categories</p>
          <p className="text-[1em] py-1">
            חווית אירוח מסעירה, המותחת את הגבולות שבין מסעדה, בר ותיאטרון
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-greyBg text-white py-8  lg:px-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Reservation and Service Availability */}
            <div className="col-span-2">
              {/* FLEX FOR RESERVE TAKEOUT DELIVERY */}
              <div className="flex ">
                {/* {RESERVE} */}
                <div className="">
                  <div className="items-center flex justify-center">
                    <CalendarIcon />
                  </div>
                  <p className="text-center text-[1em] font-bold">Reserve</p>
                </div>
                {/* {TAKEOUT} */}
                <div className="">
                  <div className="items-center flex justify-center">
                    <LockIcon />
                  </div>
                  <p className="text-center text-[1em] font-bold">Takeout</p>
                  <p className="text-center text-gray-400">Not available now</p>
                </div>
                {/* {Delivery} */}
                <div className="">
                  <p className="text-center text-xl font-bold">Delivery</p>
                  <p className="text-center text-gray-400">
                    Not available for this address
                  </p>
                </div>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <p className="text-center text-xl font-bold">Eat in</p>
                <p className="text-center text-gray-400">Not available now</p>
              </div>
              <AreaDropdown
                area={reservationInputData.area}
                onAreaChange={handleAreaChange}
                onAddNewAddress={handleAddNewAddress}
              />
            </div>

            {/* Contact and Info */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-teal-500" />
                  <span>דרך רפאל איתן 1, קריית אונו</span>
                </div>
                <div className="flex items-center">
                  <FaPhoneAlt className="mr-2 text-teal-500" />
                  <span>03-750-1111</span>
                </div>
                <div className="flex items-center">
                  <MdOutlineWatchLater className="mr-2 text-teal-500" />
                  <span>Open</span>
                  <span className="ml-2">12:00 - 23:30</span>
                </div>
                <a href="#" className="text-teal-500 hover:underline">
                  Website
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailsPage;
