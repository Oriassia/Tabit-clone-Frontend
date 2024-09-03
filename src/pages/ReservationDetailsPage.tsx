import CancelReservationDialog from "@/components/custom/dialogs/CancelReservationDialog";
import ReservationFooter from "@/components/custom/ReservationFooter/ReservationFooter";
import OrangeCalender from "@/components/custom/svg/OrangeCalender";
import OrangeClock from "@/components/custom/svg/OrangeClock";
import OrangeGuests from "@/components/custom/svg/OrangeGuests";
import api from "@/services/api.services";
import { IRestaurantReservation } from "@/types/restaurant";
import { LucideShare2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FaCalendarPlus, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";

// Define an interface for the ActionButton props for TypeScript
interface ActionButtonProps {
  icon: JSX.Element;
  text: string;
}

const ActionButton = ({ icon, text }: ActionButtonProps) => (
  <button className="w-full border border-opacity-60 border-greenButton flex flex-col py-2 items-center justify-center bg-none hover:bg-gray-800 text-white rounded-md transition duration-150">
    <div className="text-xl">{icon}</div>
    <span className="text-lg">{text}</span>
  </button>
);

const ReservationDetailsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [reservationInfo, setReservationInfo] =
    useState<IRestaurantReservation>();

  useEffect(() => {
    fetchReservation();
  }, []);

  async function fetchReservation() {
    const reservationId = searchParams.get("reservationId") || "101";
    try {
      const { data } = await api.get(`/reservations/${reservationId}`);
      setReservationInfo(data);
    } catch (error: any) {
      console.error(error);
    }
  }

  async function cancelReservation(reservationId: number) {
    try {
      await api.delete(`/reservations/${reservationId}`);
      navigate("/");
    } catch (error: any) {
      console.error(error);
    }
  }

  function getDayName(dateStr: string) {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);
  }

  function getDateNumber(dateStr: string) {
    const date = new Date(dateStr);
    const dayNumber = date.getDate().toString().padStart(2, "0");
    const monthNumber = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    return `${dayNumber}/${monthNumber}`;
  }

  function getTime(dateStr: string) {
    const date = new Date(dateStr);
    return date.toTimeString().substring(0, 5);
  }

  return (
    <>
      {/* page wrapper */}
      <div className="bg-greyBg flex flex-col gap-8 text-white font-sans h-screen">
        {/* image */}
        <img
          src={reservationInfo?.mainPhoto}
          alt="Image"
          className="bg-cover w-2/3 h-52 max-h-72 self-center"
        />

        {/* Header */}
        <div className="flex flex-col gap-5 items-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">
              {reservationInfo?.restaurant_name || "Restaurant not found"}
            </h1>
            <p className="text-2xl">
              {reservationInfo?.restaurant_address || "Address not found"}
            </p>
          </div>

          <div className="min-w-[10rem] w-2/3 max-w-[35rem] grid grid-cols-3 shadow-slate-500 shadow rounded-lg">
            {/* Date selection */}
            <div
              className="flex flex-col gap-2 py-3  items-center justify-center
              cursor-pointer border-r border-r-white"
            >
              <OrangeCalender />
              <div className="text-center">
                {reservationInfo?.date
                  ? `${getDayName(reservationInfo.date)} ${getDateNumber(
                      reservationInfo.date
                    )}`
                  : "Date not available"}
              </div>
            </div>

            {/* Time selection */}
            <div className="flex flex-col gap-2 py-3 items-center justify-center cursor-pointer border-r border-r-white ">
              <OrangeClock />
              <div className="text-center">
                {reservationInfo?.date
                  ? getTime(reservationInfo?.date)
                  : "Time not available"}
              </div>
            </div>

            {/* Guests selection */}
            <div
              className="flex flex-col gap-2 py-3  items-center justify-center border-none
              rounded-lg cursor-pointer "
            >
              <OrangeGuests />
              <div className="text-center">
                {reservationInfo?.partySize || "Guests not available"}
              </div>
            </div>
          </div>
        </div>

        {/* Middel */}
        <div className="bg-greyNavbar py-7 flex flex-col items-center">
          <div>
            <p className="text-xl text-left">
              {reservationInfo
                ? `Hey ${reservationInfo?.firstName} ${
                    reservationInfo?.lastName
                  }
              ${(<br />)}
              "Your reservation has been booked successfully`
                : "Reservation data unavailable"}
            </p>
          </div>
          {!reservationInfo && (
            <div className="flex justify-center space-x-2 mt-4">
              <button className="border-opacity-60 bg-black border border-greenButton hover:bg-gray-800 text-white font-bold py-3 px-2 rounded-md transition duration-150">
                Modify Reservation
              </button>
              <CancelReservationDialog
                reservationInfo={reservationInfo}
                cancelReservation={cancelReservation}
              />
            </div>
          )}
        </div>
        {reservationInfo && (
          <div className="flex gap-4 min-w-[10rem] w-2/3 max-w-[35rem] self-center">
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
        )}
        <p className="text-xs text-center mt-4 opacity-75">
          For any request regarding your order, please contact directly CW
        </p>
        <ReservationFooter />
      </div>
    </>
  );
};

export default ReservationDetailsPage;
