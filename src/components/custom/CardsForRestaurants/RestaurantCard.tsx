import { IRestaurant } from "@/types/restaurant";
import { Link } from "react-router-dom";

interface RestaurantCardProps {
  restaurant: IRestaurant;
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  return (
    <Link to={`/restaurants/${restaurant.restId}`}>
      <div className="dark:bg-greyNavbar rounded-lg shadow-md h-fit w-[340px] text-start border dark:border-none border-gray-200">
        <img
          src={restaurant.mainPhoto}
          alt={restaurant.name}
          className="rounded-md h-[190px] w-full object-cover"
        />
        <div className="px-5 py-6 font-rubik font-normal">
          <h3 className="text-[1.25em] text-white">{restaurant.name}</h3>
          <p className="text-zinc-500">
            {restaurant.category
              ?.split(",")
              .map((cat: string, index: number, arr: string[]) => (
                <span key={index} className="inline-flex items-center">
                  <span>{cat.trim()}</span>
                  {/* Add the separator only if it's not the last category */}
                  {index < arr.length - 1 && (
                    <span className="text-slate-500 mx-1">|</span>
                  )}
                </span>
              )) || "No categories available"}
          </p>
          <p className="text-slate-300 overflow-y-auto max-h-[1.5em]">
            {restaurant.shortDescription}
          </p>
          <div className="flex gap-2">
            <p className="text-greenButton">distance from user-#Elad Help</p>
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
