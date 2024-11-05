// import ActionButton from "@/components/custom/buttons/ActionButton";
// import ReservationFooter from "@/components/custom/ReservationFooter/ReservationFooter";
// import ReservationData from "@/components/custom/ReservationForms/ReservationData";
// import OrangeCalender from "@/components/custom/svg/OrangeCalender";
// import OrangeClock from "@/components/custom/svg/OrangeClock";
// import OrangeGuests from "@/components/custom/svg/OrangeGuests";
// import { useReservation } from "@/context/ReservationContext";
// import api from "@/services/api.services";
// import { IReservation, IRestaurantReservation } from "@/types/restaurant";

// import { useEffect, useState } from "react";
// import { FaPhone, FaMapMarkerAlt } from "react-icons/fa";
// import { MdSearch } from "react-icons/md";
// import { useNavigate, useSearchParams } from "react-router-dom";

// function ModifyReservation() {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const [reservationInfo, setReservationInfo] =
//     useState<IRestaurantReservation>();
//   const { setRequestedReservation, getAllTables, requestedReservation } =
//     useReservation();
//   useEffect(() => {
//     fetchReservation();
//   }, []);
//   useEffect(() => {
//     if (searchParams.get("step") == "customer-details") {
//       editReservation();
//     }
//   }, [searchParams]);

//   async function editReservation() {
//     if (!requestedReservation || !reservationInfo) {
//       return;
//     }
//     const newReservation: IReservation = {
//       tableId: parseInt(requestedReservation.tableId), // Provide a default value or adjust as needed
//       restId: reservationInfo.restId, // Provide a default value or adjust as needed
//       partySize: parseInt(requestedReservation.guests),
//       firstName: reservationInfo.firstName,
//       lastName: reservationInfo.lastName,
//       phoneNumber: reservationInfo.phoneNumber,
//       email: reservationInfo.email,
//       notes: reservationInfo.notes,
//       date: requestedReservation.dateTime,
//     };
//     console.log(newReservation);

//     try {
//       const { data } = await api.put("/reservations", {
//         reservationId: reservationInfo.reservationId,
//         tableId: requestedReservation.tableId,
//         newDate: requestedReservation.dateTime,
//         newPartySize: requestedReservation.guests,
//       });

//       if (data) {
//         console.log("Reservation edited successfully!: ");

//         navigate(
//           `/online-reservations/reservation-details?reservationId=${reservationInfo.reservationId}`
//         );
//       } else {
//         console.error("Failed to create reservation.");
//       }
//     } catch (error) {
//       console.error("An error occurred while creating the reservation:", error);
//     }
//   }
//   async function fetchReservation() {
//     const reservationId = searchParams.get("reservationId");
//     try {
//       const { data } = await api.get(`/reservations/${reservationId}`);
//       console.log("date fetched: ", data);
//       setReservationInfo(data);
//       setRequestedReservation({
//         dateTime: data.date,
//         tableId: data.tableId,
//         position: data.position,
//         guests: data.partySize,
//       });
//       getAllTables(data.restId);
//     } catch (error: any) {
//       console.error(error);
//     }
//   }

//   function computeDayName(dateStr: string) {
//     try {
//       const date = new Date(dateStr);
//       return new Intl.DateTimeFormat("en-GB", { weekday: "short" }).format(
//         date
//       );
//     } catch (error) {
//       return null;
//     }
//   }

//   function computeDateNumber(dateStr: string) {
//     try {
//       const date = new Date(dateStr);
//       const dayNumber = date.getDate().toString().padStart(2, "0");
//       const monthNumber = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
//       return `${dayNumber}/${monthNumber}`;
//     } catch (error) {
//       return null;
//     }
//   }

//   function computeTime(dateStr: string) {
//     try {
//       const date = new Date(dateStr);
//       return date.toTimeString().substring(0, 5);
//     } catch (error) {
//       return null;
//     }
//   }

//   return (
//     <>
//       {/* page wrapper */}
//       <div className="bg-greyDarkBg flex flex-col gap-8 text-white font-sans">
//         {/* image */}
//         <img
//           src={reservationInfo?.mainPhoto}
//           alt="Image"
//           className="bg-cover w-2/3 h-52 max-h-72 self-center"
//         />
//         {/* Header */}
//         <div className=" flex flex-col gap-5 items-center">
//           <div className="text-center">
//             <h1 className="text-2xl font-bold">
//               {reservationInfo?.restaurant_name || "Restaurant not found"}
//             </h1>
//             <p className="text-2xl">
//               {reservationInfo?.restaurant_address || "Address not found"}
//             </p>
//           </div>

//           {/*Current reservation data */}
//           <div className="flex flex-col gap-3 items-center font-rubik">
//             <div className="text-xl font-semibold ">
//               Your Current Reservation
//             </div>
//             <div title="flex-wrapper" className="flex gap-5 text-lg">
//               <div
//                 title="flex-item"
//                 className="flex content-center items-center gap-3"
//               >
//                 <OrangeCalender />
//                 <span>
//                   {computeDayName(reservationInfo?.date || "") || "unavailable"}{" "}
//                   {computeDateNumber(reservationInfo?.date || "") ||
//                     "unavailable"}
//                 </span>
//               </div>
//               <div
//                 title="flex-item"
//                 className="flex content-center items-center gap-3"
//               >
//                 <OrangeClock />
//                 <span>
//                   {computeTime(reservationInfo?.date || "") || "unavailable"}
//                 </span>
//               </div>
//               <div
//                 title="flex-item"
//                 className="flex  content-center items-center gap-3"
//               >
//                 <OrangeGuests />
//                 <span>{reservationInfo?.partySize || "unavailable"}</span>
//               </div>
//             </div>
//           </div>

//           {/* Modify section */}
//           <div className="text-xl font-semibold ">Modify Your Reservation</div>
//           {/* Testtttt */}
//           <ReservationData />

//           {/* Continue button */}
//           <div className="flex justify-center  ">
//             <button className="flex gap-3 items-center bg-greenButton py-3 px-8 text-xl rounded-full">
//               <MdSearch size={25} />
//               Continue
//             </button>
//           </div>

//           {/* Actions buttons */}
//           {reservationInfo && (
//             <div className="flex gap-4 py-5 justify-center bg-greyDarkBg">
//               <ActionButton
//                 icon={<FaPhone className="text-greenReservationActive" />}
//                 text="Call"
//               />
//               <ActionButton
//                 icon={
//                   <FaMapMarkerAlt className="text-greenReservationActive" />
//                 }
//                 text="Navigate"
//               />
//             </div>
//           )}

//           {/* Footer */}
//           <p className="text-xs text-center mt-4 opacity-75">
//             For any request regarding your order, please contact directly{" "}
//             {reservationInfo?.restaurant_name}{" "}
//           </p>
//         </div>{" "}
//         <ReservationFooter />
//       </div>
//     </>
//   );
// }

// export default ModifyReservation;

