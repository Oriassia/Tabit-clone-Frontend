import ReservationFooter from "@/components/custom/ReservationFooter/ReservationFooter";

import ReservationData from "@/components/custom/ReservationForms/ReservationData";
import api from "@/services/api.services";
import { IRestaurant } from "@/types/restaurant";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function CreateReservation() {
  const [searchParams] = useSearchParams();
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const restId = searchParams.get("restId");

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
  }, [restId]); // Include orgId as a dependency

  if (!restId) {
    return <div>Invalid Restaurant ID. Please check the URL.</div>; // Handle invalid orgId
  }

  if (!restaurant) {
    return <div>Loading...</div>; // Loading state while data is being fetched
  }

  return (
    <>
      <div className="w-full flex flex-col items-center bg-greyBg text-white">
        <img
          src={restaurant?.mainPhoto}
          alt={restaurant?.name}
          className="h-[15rem]"
        />
        <h2 className="text-3xl text-slate-300 my-1">Reserve a Table</h2>
        <h1 className="text-4xl text-white my-1">{restaurant?.name}</h1>
        <h3 className="text-xl text-white my-1 mb-3">{restaurant?.address}</h3>
        <ReservationData restId={restId} />

        <span>ReservBtn</span>
        <h3 className="text-xl text-white my-1">
          To reserve a table at {restaurant?.name}, choose a date, time, and
          number of guests.
        </h3>
        <span>ContactBtns</span>
      </div>
      <ReservationFooter />
    </>
  );
}

export default CreateReservation;
