import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { IRestaurant } from "@/types/restaurant";

interface GiftCardProps {
  restaurant: IRestaurant;
  buttonLabel: string;
  linkLabel: string;
}

const GiftCard = ({ restaurant, buttonLabel, linkLabel }: GiftCardProps) => {
  return (
    <div className="dark:bg-greyNavbar dark:border-none border border-gray-200 rounded-lg shadow-md px-4 py-2 h-fit w-[340px] text-center">
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
      <div>
        <Link
          to={`/gift-cards/create-card/${restaurant.restId}`} // Notice the leading '/'
          target="_blank"
        >
          <Button className="w-[268px] bg-greenButton hover:bg-greenButton dark:bg-greenButton dark:hover:bg-greenButton dark:text-white text-black h-8 rounded">
            {buttonLabel}
          </Button>
        </Link>
        <Link
          to={`${restaurant.website}`}
          className="block pt-2 text-greenButton underline"
        >
          {linkLabel}
        </Link>
      </div>
    </div>
  );
};

export default GiftCard;
