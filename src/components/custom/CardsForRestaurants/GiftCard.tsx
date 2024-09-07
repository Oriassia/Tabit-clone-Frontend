import { Link } from "react-router-dom";
import { IRestaurant } from "@/types/restaurant";
import MoreInformationDialog from "../dialogs/MoreInformationDialog";

interface GiftCardProps {
  restaurant: IRestaurant;
}

const GiftCard = ({ restaurant }: GiftCardProps) => {
  return (
    <div className="dark:bg-greyNavbar dark:border-none border border-gray-200 rounded-lg shadow-md px-4 py-2 h-fit max-w-[340px] text-center">
      <img
        src={restaurant.mainPhoto}
        alt={restaurant.name}
        className="rounded-md h-[130px] w-full object-cover"
      />
      <div>
        <h3 className="text-[1em] font-rubik pt-2 dark:text-white font-normal">
          {restaurant.name}
        </h3>
        <p className="dark:text-zinc-500 text-gray-400">{restaurant.address}</p>
      </div>
      <div className="w-[268px]">
        <Link
          className="block content-center w-full bg-greenButton hover:bg-greenButton dark:bg-greenButton dark:hover:bg-greenButton dark:text-white text-black h-8 rounded"
          to={`/gift-cards/create-card/${restaurant.restId}`} // Notice the leading '/'
        >
          Get a gift card
        </Link>
        <MoreInformationDialog restaurant={restaurant} />
      </div>
    </div>
  );
};

export default GiftCard;
