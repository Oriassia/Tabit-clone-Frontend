import { useEffect, useState } from "react";
import CalendarIcon from "@/components/custom/svg/CalendarIcon";
import LockIcon from "@/components/custom/svg/LockIcon";
import { IRestaurant } from "@/types/restaurant";
import api from "@/services/api.services";
import { useParams } from "react-router";

import BikeIcon from "../components/custom/svg/BikeIcon";
import RestaurantDetails from "../components/custom/ComponentsForDetails/RestaurantDetails";
import { Link } from "react-router-dom";
import PhotosDescriptionMenu from "@/components/custom/ComponentsForDetails/PhotosDescriptionMenu";
import AreaDropDown from "@/components/custom/ReservationSelector/AreaDropDown";


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
      console.log(response.data[0]);

      return response.data[0];
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
    <div className="bg-greyBg font-rubik text-white min-h-screen lg:pt-20 pt-[4.2em] ">
      <div
        className="text-[16px] w-full text-white py-2 px-[3em]"
        style={{ background: "#616161" }}
      >
        <div className="flex gap-1">
          <p>הזמנת-מקום</p>
          <p>-</p>
          <p>טאביט</p>
        </div>
        <div className="flex gap-1">
          <p className="underline">Restaurants</p>
          <p className="">&gt;</p>
          <p className="underline">{restaurant?.name}</p>
        </div>
      </div>
      {/* Мобильная версия */}
      <div className="lg:hidden md:hidden block">
        {/* Изображение */}
        <div>
          <img
            src={restaurant?.mainPhoto}
            alt="Restaurant"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="px-3 py-5" style={{ background: "#303030" }}>
          <h1 className="text-5xl font-medium ">{restaurant?.name}</h1>
          <p className="text-lg text-gray-400 py-3">
            {restaurant?.category?.split(",").map((cat, index, arr) => (
              <span key={index} className="text-[1em]">
                {cat.trim()}
                {index < arr.length - 1 && " | "}
              </span>
            ))}
          </p>
          <p className="text-[1em] py-1">{restaurant?.shortDescription}</p>
        </div>
      </div>

      {/* Версия для планшетов и десктопов */}
      <div className="hidden lg:flex md:flex ">
        <div className="flex w-full px-[3em]" style={{ background: "#303030" }}>
          <div className="w-1/2  py-5">
            <h1 className="text-5xl font-medium ">{restaurant?.name}</h1>
            <p className="text-lg text-gray-400 py-3">
              {restaurant?.category?.split(",").map((cat, index, arr) => (
                <span key={index} className="text-[1em]">
                  {cat.trim()}
                  {index < arr.length - 1 && " | "}
                </span>
              ))}
            </p>
            <p className="text-[1em] py-1">{restaurant?.shortDescription}</p>
          </div>
          <div className="w-1/2">
            <img
              src={restaurant?.mainPhoto}
              alt="Restaurant"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      {/* Bottom Section */}
      <div className="bg-greyBg text-white py-8">
        <div className="flex flex-col lg:flex-row  justify-evenly">
          <div className="">
            <div className="px-3 flex flex-col justify-center">
              {/* FLEX FOR RESERVE, TAKEOUT, DELIVERY - Always flex-row */}
              <div className="flex flex-col justify-center">
                <div className="flex flex-row border border-greyBorder rounded-3xl lg:max-w-fit">
                  {/* {RESERVE} */}
                  <button className="pt-3 pb-3 border-r border-greyBorder w-full lg:w-auto">
                    <div className="items-center flex justify-center">
                      <CalendarIcon />
                    </div>
                    <p className="text-center text-[1em] font-bold">Reserve</p>
                  </button>
                  {/* {TAKEOUT} */}
                  <div className="border-r border-greyBorder py-3 w-full lg:w-auto">
                    <div className="items-center flex justify-center">
                      <LockIcon />
                    </div>
                    <p className="text-center text-[1em] text-greyDropDownMenu font-bold text-gray">
                      Takeout
                    </p>
                  </div>
                  {/* {Delivery} */}
                  <div className="py-3 w-full lg:w-auto">
                    <div className="items-center flex justify-center">
                      <BikeIcon />
                    </div>
                    <p className="text-center text-greyDropDownMenu text-[1em] font-bold">
                      Delivery
                    </p>
                  </div>
                </div>
                {/* Dropdown */}
                <div className="flex justify-center  pt-[1.6em]">
                  <AreaDropdown
                    area={reservationInputData.area}
                    onAreaChange={handleAreaChange}
                    onAddNewAddress={handleAddNewAddress}
                  />
                </div>
              </div>

              {/* MENUS/DESCRIPTION/PHOTOS*/}
              <div>
                {restaurant && (
                  <PhotosDescriptionMenu restaurant={restaurant} />
                )}
              </div>
            </div>
          </div>

          {/* Contact and Info */}
          <div className="lg:w-1/4 lg:ml-8 mt-8 lg:mt-0">
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
