import { IRestaurant } from "@/types/restaurant";
import { Link } from "react-router-dom";

interface RestaurantCardProps {
  restaurant: IRestaurant;
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  return (
    <Link to={`/restaurants/${restaurant.restId}`}>
      <div className="dark:bg-greyNavbar rounded-lg shadow-md w-[325px] h-[340px] text-start border dark:border-none border-gray-200 ">
        <img
          src={restaurant.mainPhoto}
          alt={restaurant.name}
          className="rounded-md h-[190px] w-full object-cover"
        />
        <div className="px-5 py-6 font-rubik font-normal">
          <h3 className="text-[1.25em] text-white">{restaurant.name}</h3>
          <p className="text-zinc-500 truncate">{restaurant.category}</p>
          <p className="text-slate-300 truncate ">
            {restaurant.shortDescription}
          </p>
          <div className="flex gap-[1.7px]">
            <p className="text-greenButton">{restaurant.distance_km} Km</p>
            <p className="text-slate-700">|</p>
            <p className="dark:text-zinc-500 text-gray-400">
              {restaurant.address}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
