import React from "react";
import { Link } from "react-router-dom";
import Location from "../svg/Location";
import CallIcon from "../svg/CallIcon";
import BillIcon from "../svg/BillIcon";
import OpenHours from "./OpenHours";
import { IRestaurant } from "../../../types/restaurant";

interface RestaurantDetailsProps {
  restaurant: IRestaurant;
}

const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({
  restaurant,
}) => {
  // Проверка на наличие данных о ресторане
  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col space-y-4 px-5">
      <div className="flex items-center gap-6 border-b border-greyBorder pb-3">
        <Location />
        <span>{restaurant.address}</span>
      </div>
      <div className="flex items-center gap-6 border-b border-greyBorder pb-3">
        <CallIcon />
        <span>{restaurant.phoneNumber}</span>
      </div>
      {/* Pass the restaurant prop to OpeningHours */}
      <OpenHours restaurant={restaurant} />
      <div className="flex items-center gap-6">
        <BillIcon />
        <Link to={`${restaurant.website}`} className="text-greenButton">
          Website
        </Link>
      </div>
    </div>
  );
};

export default RestaurantDetails;
