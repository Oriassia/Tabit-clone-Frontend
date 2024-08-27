import { IRestaurant } from "@/types/restaurant";

interface RestaurantCardProps {
  restaurant: IRestaurant;
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  return (
    <div className="dark:bg-greyNavbar rounded-lg shadow-md h-fit w-[340px] text-start border dark:border-none border-gray-200">
      <img
        src={restaurant.mainPhoto}
        alt={restaurant.name}
        className="rounded-md h-[190px] w-full object-cover"
      />
      <div className="px-5 py-6 font-rubik font-normal">
        <h3 className="text-[1.25em] text-white">{restaurant.name}</h3>
        <p className="text-zinc-500">{restaurant.category}</p>
        <p className="text-slate-300">{restaurant.shortDescription}</p>
        <div className="flex gap-2">
          <p className="text-greenButton">distance from user-#Elad Help</p>
          <p className="text-slate-700">|</p>
          <p className="dark:text-zinc-500 text-gray-400">
            {restaurant.address}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
