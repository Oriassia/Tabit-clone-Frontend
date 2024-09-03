import ReservationFooter from "@/components/custom/ReservationFooter/ReservationFooter";
import ReservationData from "@/components/custom/ReservationForms/ReservationData";
import api from "@/services/api.services";
import { IRestaurant } from "@/types/restaurant";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ActionButton } from "./ReservationDetailsPage";
import { LucideShare2 } from "lucide-react";
import { FaCalendarPlus, FaPhone } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import ReservationForm from "@/components/custom/ReservationForms/ReservationForm";

function CreateReservation() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const restId = searchParams.get("restid");
  const step = searchParams.get("step");
  const tableId = searchParams.get("tableid");

  useEffect(() => {
    if (tableId) {
      searchParams.set("step", "customer-details");
      setSearchParams(searchParams);
    }
  }, [tableId, searchParams]);

  useEffect(() => {
    async function getRestaurantData() {
      if (restId) {
        try {
          const { data } = await api.get(`/restaurants/${restId}`);
          console.log(data[0]); // Debug log to verify fetched data
          setRestaurant(data[0]); // Set the fetched restaurant data
        } catch (error) {
          console.error("Failed to fetch restaurant data:", error); // Error handling
        }
      }
    }
    getRestaurantData();
  }, [restId]);

  if (!restId) {
    return <div>Invalid Restaurant ID. Please check the URL.</div>; // Handle invalid orgId
  }

  if (!restaurant) {
    return <div>Loading...</div>; // Loading state while data is being fetched
  }

  // Common elements that are shared between both return scenarios
  const commonElements = (
    <>
      <h1 className="text-4xl text-white my-1">{restaurant?.name}</h1>
      <h3 className="text-xl text-white my-1 mb-3">{restaurant?.address}</h3>
      <ReservationData />
    </>
  );

  // Return scenario for the "search" step
  if (step === "search") {
    return (
      <>
        <div className="w-full flex flex-col items-center bg-greyBg text-white">
          <img
            src={restaurant?.mainPhoto}
            alt={restaurant?.name}
            className="h-[15rem]"
          />
          <h2 className="text-3xl text-slate-300 my-1">Reserve a Table</h2>
          {commonElements}
          <h3 className="text-xl text-white my-1">
            To reserve a table at {restaurant?.name}, choose a date, time, and
            number of guests.
          </h3>{" "}
          <div className="flex gap-4 py-5 justify-center bg-greyDarkBg mt-5">
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
        </div>
        <ReservationFooter />
      </>
    );
  }

  // Return scenario for any other step
  return (
    <>
      <div className="w-full flex flex-col items-center bg-greyBg text-white">
        {commonElements}
        <ReservationForm />
      </div>
      <ReservationFooter />
    </>
  );
}

export default CreateReservation;
