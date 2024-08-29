import { useEffect, useState } from "react";
import { AreaDropdown } from "../components/costum/ReservationSelector/ReservationSelector";
import CalendarIcon from "@/components/costum/svg/CalendarIcon";
import LockIcon from "@/components/costum/svg/LockIcon";
import { IRestaurant } from "@/types/restaurant";
import api from "@/services/api.services";
import { useParams } from "react-router";
import BikeIcon from "@/components/costum/svg/BikeIcon";
// import Location from "@/components/costum/svg/Location";
// import CallIcon from "@/components/costum/svg/CallIcon";
// import OpenIcon from "@/components/costum/svg/OpenIcon";
// import BillIcon from "@/components/costum/svg/BillIcon";
// import { Link } from "react-router-dom";
// import OpeningHours from "@/components/costum/ComponentsForDetails/OpenHours";
import RestaurantDetails from "@/components/costum/ComponentsForDetails/RestaurantDetails";

const RestaurantDetailsPage: React.FC = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);

  const [reservationInputData, setReservationInputData] = useState({
    area: "Tel Aviv-Jaffa area",
  });

  useEffect(() => {
    if (restaurantId) {
      fetchRestaurantById(restaurantId)
        .then((data) => {
          if (data) {
            setRestaurant(data);
          } else {
            setError("Restaurant not found.");
          }
        })
        .catch(() => setError("Failed to fetch restaurant"))
        .finally(() => setLoading(false));
    }
  }, [restaurantId]);

  const fetchRestaurantById = async (
    restaurantId: string
  ): Promise<IRestaurant | null> => {
    try {
      const response = await api.get(`/restaurants/${restaurantId}`);
      if (response.status !== 200) {
        console.error("Failed to fetch restaurant data");
        return null;
      }
      return response.data;
    } catch (error) {
      console.error("Failed to fetch restaurant:", error);
      return null;
    }
  };

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
            <p className="underline">{restaurant?.name}</p>
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
          <h1 className="text-5xl font-medium ">{restaurant?.name}</h1>
          <p className="text-lg text-gray-400 py-3 ">
            {restaurant?.category
              ?.split(",") // Разделяем строку на массив по запятой
              .map((cat, index, arr) => (
                <span key={index} className="text-[1em]">
                  {cat.trim()} {/* Удаляем лишние пробелы */}
                  {index < arr.length - 1 && " | "}
                  {/* Добавляем знак | между элементами */}
                </span>
              ))}
          </p>
          <p className="text-[1em] py-1">{restaurant?.shortDescription}</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-greyBg text-white py-8  ">
        <div className="">
          <div className="">
            {/* Reservation and Service Availability */}
            <div className="px-3 flex flex-col justify-center">
              {/* FLEX FOR RESERVE TAKEOUT DELIVERY */}
              <div className="flex border border-greyBorder rounded-3xl">
                {/* {RESERVE} */}
                <button className="pt-3 pb-10 border-r border-greyBorder">
                  <div className="items-center flex justify-center">
                    <CalendarIcon />
                  </div>
                  <p className="text-center text-[1em] font-bold">Reserve</p>
                </button>
                {/* {TAKEOUT} */}
                <div className="border-r border-greyBorder py-3">
                  <div className="items-center flex justify-center">
                    <LockIcon />
                  </div>
                  <p className="text-center text-[1em] text-greyDropDownMenu font-bold text-gray">
                    Takeout
                  </p>
                </div>
                {/* {Delivery} */}
                <div className="py-3">
                  <div className="items-center flex justify-center">
                    <BikeIcon />
                  </div>
                  <p className="text-center text-greyDropDownMenu text-[1em] font-bold">
                    Delivery
                  </p>
                </div>
              </div>
              <div className="flex justify-center pt-[1.6em]">
                <AreaDropdown
                  area={reservationInputData.area}
                  onAreaChange={handleAreaChange}
                  onAddNewAddress={handleAddNewAddress}
                />
              </div>
            </div>

            {/* Contact and Info */}

            {/* Contact and Info */}
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>{error}</div>
            ) : (
              restaurant && <RestaurantDetails restaurant={restaurant} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailsPage;
