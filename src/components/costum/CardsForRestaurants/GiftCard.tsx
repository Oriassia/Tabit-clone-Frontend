import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";

interface GiftCardProps {
  image: string;
  title: string;
  location: string;
  buttonLabel: string;
  linkLabel: string;
  linkUrl: string;
}

const GiftCard: React.FC<GiftCardProps> = ({
  image,
  title,
  location,
  buttonLabel,
  linkLabel,
  linkUrl,
}) => {
  return (
    <div className="bg-greyNavbar rounded-lg shadow-md px-4 py-2 h-fit w-[300px] text-center">
      <img
        src={image}
        alt={title}
        className="rounded-md h-[128px] w-full object-cover"
      />
      <div>
        <h3 className="text-[1em] font-rubik pt-2 text-white font-normal">
          {title}
        </h3>
        <p className="text-zinc-500">{location}</p>
      </div>
      <div>
        <Button className="w-[268px] bg-greenButton hover:bg-greenButton text-white h-8 rounded">
          {buttonLabel}
        </Button>
        <Link to={linkUrl} className="block pt-2 text-greenButton underline">
          {linkLabel}
        </Link>
      </div>
    </div>
  );
};

export default GiftCard;
