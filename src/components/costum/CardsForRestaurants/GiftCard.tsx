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
    <div className="dark:bg-greyNavbar dark:border-none border border-gray-200 rounded-lg shadow-md px-4 py-2 h-fit w-[340px] text-center">
      <img
        src={image}
        alt={title}
        className="rounded-md h-[130px] w-full object-cover"
      />
      <div>
        <h3 className="text-[1em] font-rubik pt-2 dark:text-white font-normal">
          {title}
        </h3>
        <p className="dark:text-zinc-500 text-gray-400">{location}</p>
      </div>
      <div>
        <Button className="w-[268px] bg-greenButton hover:bg-greenButton dark:bg-greenButton dark:hover:bg-greenButton dark:text-white text-black h-8 rounded">
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
