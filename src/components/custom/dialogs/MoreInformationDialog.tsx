import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IRestaurant } from "@/types/restaurant";
import { X } from "lucide-react";
import { FaLocationDot } from "react-icons/fa6";
import { HiOutlinePhone } from "react-icons/hi";
import { useNavigate } from "react-router";

function MoreInformationDialog({ restaurant }: { restaurant: IRestaurant }) {
  const navigate = useNavigate();

  return (
    <>
      <Dialog>
        <DialogTrigger className="pt-2 text-greenButton underline">
          More information
        </DialogTrigger>
        <DialogContent className="dark:text-white text-2xl p-0 pt-4 dark:bg-greyBg rounded-lg">
          <DialogHeader>
            <DialogClose className="absolute left-4 top-4 bg-greenButton rounded-full p-0.5">
              <X size={18} />
            </DialogClose>
            <DialogTitle className="text-center text-3xl">
              {restaurant.name}
            </DialogTitle>
            <DialogDescription className="text-center text-xl dark:text-white font-semibold font-rubik">
              {restaurant?.category?.split(",").map((cat, index, arr) => (
                <span key={index}>
                  {cat.trim()}
                  {index < arr.length - 1 && " "}
                </span>
              ))}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col">
            <div className="border-y-2 border-gray-600 py-3 text-center">
              <div>{restaurant.longDescription || "No details"}</div>
              <div>
                {restaurant?.photos?.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className="w h-auto"
                  />
                )) || "No photos"}
              </div>
            </div>
            <div className="flex flex-col gap-8 p-5 ">
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <FaLocationDot className="text-greenButton" size={40} />
                  <div>{restaurant.address || "address unavailable"} </div>
                </div>
                <div className="flex gap-3">
                  <HiOutlinePhone className="text-greenButton" size={40} />
                  <div>
                    {restaurant.phoneNumber || "Phone number unavailable"}{" "}
                  </div>
                </div>
              </div>

              <button
                onClick={() =>
                  navigate(`/gift-cards/create-card/${restaurant.restId}`)
                }
                className="bg-greenHamburger rounded-md py-2"
              >
                Get a gift card
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default MoreInformationDialog;
