import ReservationFooter from "@/components/custom/ReservationFooter/ReservationFooter";
import ReservationData from "@/components/custom/ReservationForms/ReservationData";
import api from "@/services/api.services";
import { IRestaurant, IRestaurantReservation } from "@/types/restaurant";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { FaPhone } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import ReservationForm from "@/components/custom/ReservationForms/ReservationForm";
import { useReservation } from "@/context/ReservationContext";
import ActionButton from "@/components/custom/buttons/ActionButton";
import OrangeCalender from "@/components/custom/svg/OrangeCalender";
import OrangeGuests from "@/components/custom/svg/OrangeGuests";
import OrangeClock from "@/components/custom/svg/OrangeClock";
import {
  computeDateNumber,
  computeDayName,
  computeTime,
} from "@/services/time.services";
import Spinner from "@/components/custom/Loaders/Spinner";

function CreateReservation() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const restId = searchParams.get("restId");
  const step = searchParams.get("step");
  const [olderReservation, setOlderReservation] =
    useState<IRestaurantReservation | null>(null);

  const { requestedReservation, getAllTables, setRequestedReservation } =
    useReservation();

  useEffect(() => {
    if (requestedReservation && requestedReservation.tableId) {
      searchParams.set("step", "customer-details");
    } else {
      searchParams.set("step", "search");
    }
    setSearchParams(searchParams);
  }, [searchParams]);

  useEffect(() => {
    getAllTables();
    console.log("got all tables");
    if (searchParams.get("reservationId")) {
      fetchReservation();
    }
  }, []);

  async function fetchReservation() {
    try {
      const reservationId = searchParams.get("reservationId");
      if (reservationId) {
        const { data } = await api.get(`/reservations/${reservationId}`);

        setOlderReservation(data);
      }
    } catch (error: any) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function getRestaurantData() {
      if (restId) {
        try {
          const { data } = await api.get(`/restaurants/${restId}`);
          setRestaurant(data[0]); // Set the fetched restaurant data
        } catch (error) {
          console.log(3);

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
    return (
      <div className="bg-greyBg w-full h-screen py-56">
        <Spinner />
      </div>
    ); // Loading state while data is being fetched
  }

  // Common elements that are shared between both return scenarios

  // Return scenario for the "search" step
  if (step === "search") {
    return (
      <>
        <div className="w-full min-h-dvh flex flex-col items-center bg-greyBg text-white">
          <img
            src={restaurant?.mainPhoto}
            alt={restaurant?.name}
            className="h-[15rem]"
          />
          <h2 className="text-3xl text-slate-300 my-1">Reserve a Table</h2>
          <h1 className="text-4xl text-white my-1">{restaurant?.name}</h1>
          <h3 className="text-xl text-white my-1 mb-3">
            {restaurant?.address}
          </h3>
          {/*Older reservation data */}
          {olderReservation && (
            <>
              <div className="flex flex-col gap-3 items-center font-rubik">
                <div className="text-xl font-semibold ">
                  Your Current Reservation
                </div>
                <div title="flex-wrapper" className="flex gap-5 text-lg">
                  <div
                    title="flex-item"
                    className="flex content-center items-center gap-3"
                  >
                    <OrangeCalender />
                    <span>
                      {computeDayName(olderReservation?.date || "") ||
                        "unavailable"}{" "}
                      {computeDateNumber(olderReservation?.date || "") ||
                        "unavailable"}
                    </span>
                  </div>
                  <div
                    title="flex-item"
                    className="flex content-center items-center gap-3"
                  >
                    <OrangeClock />
                    <span>
                      {computeTime(olderReservation?.date || "") ||
                        "unavailable"}
                    </span>
                  </div>
                  <div
                    title="flex-item"
                    className="flex  content-center items-center gap-3"
                  >
                    <OrangeGuests />
                    <span>{olderReservation?.partySize || "unavailable"}</span>
                  </div>
                </div>
              </div>
              <div className="text-xl font-semibold my-3">
                Modify Your Reservation
              </div>
            </>
          )}
          {/* Modify section */}
          <ReservationData />
          <h3 className="text-xl text-white my-1">
            To reserve a table at {restaurant?.name}, choose a date, time, and
            number of guests.
          </h3>{" "}
          <div className="flex gap-4 py-5 justify-center bg-greyDarkBg mt-5">
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
  } else if (step === "customer-details") {
    return (
      <>
        <div className="w-full min-h-dvh flex justify-center bg-greyBg text-white ">
          <div className="py-24 px-56 w-full flex flex-col items-center">
            <span
              className="absolute top-5 left-80 px-4 py-2 cursor-pointer"
              onClick={() => {
                setRequestedReservation(null);
                searchParams.set("step", "search");
                setSearchParams(searchParams);
              }}
            >
              {"< Back to Search"}
            </span>
            <h1 className="text-4xl text-white my-1">{restaurant?.name}</h1>
            <h3 className="text-xl text-white my-1 mb-3">
              {restaurant?.address}
            </h3>
            <ReservationData />
            <ReservationForm
              olderReservation={olderReservation}
              restPhone={restaurant?.phoneNumber}
            />{" "}
            <div className="flex gap-4 py-5 justify-center bg-greyDarkBg mt-5">
              <ActionButton
                icon={<FaPhone className="text-greenButton" />}
                text="Call"
              />
              <ActionButton
                icon={<FaMapMarkerAlt className="text-greenButton" />}
                text="Navigate"
              />
            </div>
          </div>{" "}
        </div>{" "}
        <ReservationFooter />
      </>
    );
  } else {
    return <div>404</div>;
  }
}

export default CreateReservation;
