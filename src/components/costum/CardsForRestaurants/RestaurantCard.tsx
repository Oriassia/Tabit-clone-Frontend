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
    <div className="bg-greyNavbar rounded-lg shadow-md h-fit w-[340px] text-start">
      <img
        src={image}
        alt={title}
        className="rounded-md h-[190px] w-full object-cover"
      />
      <div className="px-5 py-6 font-rubik font-normal">
        <h3 className="text-[1.25em] text-white">{title}</h3>
        <p className="text-zinc-500">{categories}</p>
        <p className="text-slate-300">{description}</p>
        <div className="flex gap-2">
          <p className="text-greenButton">{distance}</p>
          <p className="text-slate-700">|</p>
          <p className="text-zinc-500">{address}</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
