import ActionButton from "@/components/custom/buttons/ActionButton";
import CancelReservationDialog from "@/components/custom/dialogs/CancelReservationDialog";
import ReservationFooter from "@/components/custom/ReservationFooter/ReservationFooter";
import OrangeCalender from "@/components/custom/svg/OrangeCalender";
import OrangeClock from "@/components/custom/svg/OrangeClock";
import OrangeGuests from "@/components/custom/svg/OrangeGuests";
import OrangeTablesIcon from "@/components/custom/svg/OrangeTablesIcon";
import { useToast } from "@/hooks/use-toast";

import api from "@/services/api.services";
import { IRestaurantReservation } from "@/types/restaurant";
import { LucideShare2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FaCalendarPlus, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";

const ReservationDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [reservationInfo, setReservationInfo] =
    useState<IRestaurantReservation>();
  const { toast } = useToast();

  useEffect(() => {
    fetchReservation();
  }, []);

  async function fetchReservation() {
    const reservationId = searchParams.get("reservationId") || "101";
    try {
      const { data } = await api.get(`/reservations/${reservationId}`);
      console.log("[reservation-details-page]-fetched reservation:", data);

      setReservationInfo(data);
      // setRequestedReservation({
      //   dateTime: data.date,
      //   tableId: data.tableId,
      //   position: data.position,
      //   guests: data.partySize,
      // });
    } catch (error: any) {
      console.error(error);
    }
  }

  async function cancelReservation(reservationId: number) {
    try {
      await api.delete(`/reservations/${reservationId}`);
      navigate("/");
      toast({
        variant: "default",
        title: `Your resrvation canceld successfully`,
      });
    } catch (error: any) {
      console.error(error);
    }
  }

  function getDayNameFromString(dateStr: string) {
    const date = new Date(dateStr);
    const options = { weekday: "short" } as const;
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  function getDateNumber(dateStr: string) {
    const date = new Date(dateStr);
    const dayNumber = date.getDate().toString().padStart(2, "0");
    const monthNumber = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    return `${dayNumber}/${monthNumber}`;
  }

  function getTime(dateStr: string) {
    const date = new Date(dateStr);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  return (
    <>
      {/* page wrapper */}
      <div className="bg-greyDarkBg flex flex-col gap-8 text-white font-sans">
        {/* image */}
        <img
          src={reservationInfo?.mainPhoto}
          alt="Image"
          className="bg-cover w-2/3 h-52 max-h-72 self-center"
        />

        {/* Header */}
        <div className=" flex flex-col gap-5 items-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">
              {reservationInfo?.restaurant_name || "Restaurant not found"}
            </h1>
            <p className="text-2xl">
              {reservationInfo?.restaurant_address || "Address not found"}
            </p>
          </div>

          <div className="min-w-[10rem] w-2/3 max-w-[35rem] grid grid-cols-3 shadow-slate-500 shadow rounded-lg text-lg">
            {/* Date selection */}
            <div
              className="flex flex-col gap-2 py-3  items-center justify-center
              cursor-pointer border-r border-r-white"
            >
              <OrangeCalender />
              <div className="text-center">
                {reservationInfo?.date
                  ? `${getDayNameFromString(
                      reservationInfo.date
                    )} ${getDateNumber(reservationInfo.date)}`
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

            {/* Position selection */}
            <div className="p-7 flex content-center items-center gap-5 col-start-1 col-end-4 border-t">
              <OrangeTablesIcon />
              <div className="text-center">
                {reservationInfo?.position || "Table position not available"}
              </div>
            </div>
          </div>
        </div>

        {/* Feadback section */}
        <div className="bg-greyNavbar py-7 flex flex-col items-center">
          <div className="bg-greyNavbar py-7 flex flex-col items-center">
            <div>
              {reservationInfo ? (
                <p className="text-xl text-left">
                  Hey {reservationInfo?.firstName} {reservationInfo?.lastName}
                  ,
                  <br />
                  Your reservation has been booked successfully
                </p>
              ) : (
                <p className="text-xl text-left">
                  Reservation data unavailable
                </p>
              )}
            </div>
          </div>

          {reservationInfo && (
            <div className="flex justify-center space-x-2 py-5">
              <button
                onClick={() => {
                  navigate(
                    `/online-reservations?restId=${reservationInfo.restId}&reservationId=${reservationInfo.reservationId}&step=search`
                  );
                }}
                className="border-opacity-60 bg-black border border-greenButton hover:bg-gray-800 text-white font-bold py-3 px-2 rounded-md transition duration-150"
              >
                Modify Reservation
              </button>
              <CancelReservationDialog
                onClickCancel={() =>
                  cancelReservation(reservationInfo.reservationId)
                }
              />
            </div>
          )}
        </div>

        {/* Share section */}
        {reservationInfo && (
          <div className="flex gap-4 py-5 justify-center bg-greyDarkBg">
            <ActionButton
              icon={<LucideShare2 className="text-greenReservationActive" />}
              text="Share"
            />
            <ActionButton
              icon={<FaCalendarPlus className="text-greenReservationActive" />}
              text="Add to Calendar"
            />
            <ActionButton
              icon={<FaPhone className="text-greenReservationActive" />}
              text="Call"
            />
            <ActionButton
              icon={<FaMapMarkerAlt className="text-greenReservationActive" />}
              text="Navigate"
            />
          </div>
        )}

        {/* Footer */}
        <p className="text-xs text-center mt-4 opacity-75">
          For any request regarding your order, please contact directly{" "}
          {reservationInfo?.restaurant_name}
        </p>
        <ReservationFooter />
      </div>
    </>
  );
};

export default ReservationDetailsPage;
