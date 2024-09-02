import ReservationFooter from "@/components/custom/ReservationFooter/ReservationFooter";
import OrangeCalender from "@/components/custom/svg/OrangeCalender";
import OrangeClock from "@/components/custom/svg/OrangeClock";
import OrangeGuests from "@/components/custom/svg/OrangeGuests";
import { LucideShare2 } from "lucide-react";
import { FaCalendarPlus, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

// Define an interface for the ActionButton props for TypeScript
interface ActionButtonProps {
  icon: JSX.Element;
  text: string;
}

const ActionButton = ({ icon, text }: ActionButtonProps) => (
  <button className="border border-opacity-60 border-greenButton flex flex-col py-2 items-center justify-center bg-none hover:bg-gray-800 text-white rounded-md transition duration-150">
    <div className="text-xl">{icon}</div>
    <span className="text-lg">{text}</span>
  </button>
);

const ReservationDetailsPage = () => {
  return (
    <>
      {/* page wrapper */}
      <div className="bg-greyBg flex flex-col justify-between text-white font-sans h-screen ">
        {/* image */}
        <img src="{rest.image}" alt="@@@@@ IM AN IMAGEEE @@@@@@" className="" />

        {/* Header */}
        <div className="flex flex-col gap-5 items-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">{"Rest Name"}</h1>
            <p className="text-2xl">{"Rest Adress"}</p>
          </div>

          <div className="min-w-[10rem] w-2/3 max-w-[35rem] grid grid-cols-3 shadow-slate-500 shadow rounded-lg">
            {/* Date selection */}
            <div
              className="flex flex-col gap-2 py-3  items-center justify-center
              cursor-pointer border-r border-r-white"
            >
              <OrangeCalender />
              <div className="text-center">{"Date"}</div>
            </div>

            {/* Time selection */}
            <div className="flex flex-col gap-2 py-3 items-center justify-center cursor-pointer border-r border-r-white ">
              <OrangeClock />
              <div className="text-center">{"Time"}</div>
            </div>

            {/* Guests selection */}
            <div
              className="flex flex-col gap-2 py-3  items-center justify-center border-none
              rounded-lg cursor-pointer "
            >
              <OrangeGuests />
              <div className="text-center">{"Guests"}</div>
            </div>
          </div>
        </div>

        {/* Middel */}
        <div className="bg-greyNavbar py-7 flex flex-col items-center">
          <div>
            <p className="text-xl text-left">
              {"Hey user Name"} <br />{" "}
              {"Your reservation has been booked successfully"}
            </p>
          </div>
          <div className="flex justify-center space-x-2 mt-4">
            <button className="border-opacity-60 bg-black border border-greenButton hover:bg-gray-800 text-white font-bold py-3 px-2 rounded-md transition duration-150">
              Modify Reservation
            </button>
            <button className="bg-black border border-opacity-60 border-greenButton hover:bg-gray-800 text-white font-bold py-3 px-2 rounded-md transition duration-150">
              Cancel Reservation
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 w-1/2 text-center mx-auto">
          <ActionButton
            icon={<LucideShare2 className="text-greenButton" />}
            text="Share"
          />
          <ActionButton
            icon={<FaCalendarPlus className="text-greenButton" />}
            text="Add to Calendar"
          />
          <ActionButton
            icon={<FaPhone className="text-greenButton" />}
            text="Call"
          />
          <ActionButton
            icon={<FaMapMarkerAlt className="text-greenButton" />}
            text="Navigate"
          />
        </div>
        <p className="text-xs text-center mt-4 opacity-75">
          For any request regarding your order, please contact directly CW
        </p>
        <ReservationFooter />
      </div>
    </>
  );
};

export default ReservationDetailsPage;
