import React from 'react';

interface RestaurantCardProps {
  image: string;
  title: string;
  categories: string;
  description: string;
  distance: string;
  address: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  image,
  title,
  categories,
  description,
  distance,
  address,
}) => {
  return (
    <div className="dark:bg-greyNavbar rounded-lg shadow-md h-fit w-[340px] text-start border dark:border-none border-gray-200">
      <img
        src={image}
        alt={title}
        className="rounded-t-md h-[190px] w-full object-cover"
      />
      <div className="px-5 py-6 font-rubik font-normal">
        <h3 className="text-[1.25em] dark:text-white">{title}</h3>
        <p className="dark:text-zinc-500 text-gray-400">{categories}</p>
        <p className="dark:text-slate-300 text-zinc-500">{description}</p>
        <div className="flex gap-2">
          <p className="text-greenButton">{distance}</p>
          <p className="text-slate-700">|</p>
          <p className="dark:text-zinc-500 text-gray-400">{address}</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
