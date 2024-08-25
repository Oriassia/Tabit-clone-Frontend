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
    <div className="bg-greyNavbar rounded-lg shadow-md px-4 py-2 h-fit w-[340px] text-center">
      <img
        src={restaurant.mainPhoto}
        alt={restaurant.name}
        className="rounded-md h-[130px] w-full object-cover"
      />
      <div>
        <h3 className="text-[1em] font-rubik pt-2 text-white font-normal">
          {restaurant.name}
        </h3>
        <p className="text-zinc-500">
          {`${restaurant.address.street} ${restaurant.address.number}, ${restaurant.address.city}`}
        </p>
      </div>
      <div>
        <Button className="w-[268px] bg-greenButton hover:bg-greenButton text-white h-8 rounded">
          {buttonLabel}
        </Button>
        <Link
          to={`${restaurant.contactInfo.websiteURL}`}
          className="block pt-2 text-greenButton underline"
        >
          {linkLabel}
        </Link>
      </div>
    </div>
  );
};

export default GiftCard;
