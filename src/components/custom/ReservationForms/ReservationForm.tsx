import PhoneInput from "./PhoneInput";
import { useState, useEffect } from "react";
import { IReservation } from "@/types/restaurant";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useReservation } from "@/context/ReservationContext"; // Assuming the context is exported here
import api from "@/services/api.services";
import { FaCheck } from "react-icons/fa6";
import { Dialog, DialogContent } from "@/components/ui/dialog"; // Import ShadCN Dialog components
import WarningIcon from "../svg/WarningIcon";
import { useToast } from "@/hooks/use-toast";

function ReservationForm({
  restPhone,
  olderReservation,
}: {
  restPhone: string | undefined;
  olderReservation: IReservation | null;
}) {
  const [userPhone, setUserPhone] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [notes, setNotes] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5 minutes in seconds
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // State to manage Dialog visibility
  const [searchParams, setSearchParams] = useSearchParams(); // Correctly initialize searchParams and setSearchParams
  const navigate = useNavigate();
  const { toast } = useToast();

  const { requestedReservation, restId, setRequestedReservation } =
    useReservation();

  // Countdown Timer
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerInterval); // Stop the timer
          setIsDialogOpen(true); // Open Dialog when timer ends

          console.log(isDialogOpen);

          return 0; // Set time to 0
        }
        return prevTime - 1; // Decrease time by 1 second
      });
    }, 1000); // Every second

    return () => clearInterval(timerInterval); // Clean up interval on component unmount
  }, []);

  function goBack() {
    // Create a new instance of URLSearchParams based on current search parameters
    setRequestedReservation(null);
    searchParams.set("step", "search");

    // Update the search params using setSearchParams function
    setSearchParams(searchParams); // Correct usage of setSearchParams
  }
  // Format time to MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Create reservation function
  async function createReservation() {
    if (!requestedReservation || !restId) return;
    const newReservation: IReservation = {
      tableId: parseInt(requestedReservation.tableId), // Provide a default value or adjust as needed
      restId: parseInt(restId), // Provide a default value or adjust as needed
      partySize: parseInt(requestedReservation.guests),
      firstName,
      lastName,
      phoneNumber: userPhone,
      email,
      notes,
      date: requestedReservation.dateTime,
    };

    try {
      console.log(newReservation);

      const { data } = await api.post("/reservations", newReservation);

      if (data) {
        toast({
          variant: "default",
          title: `Your resrvation to ${data.restaurant.name} created successfully!`,
        });

        olderReservation?.reservationId &&
          cancelReservation(olderReservation?.reservationId);

        setRequestedReservation(null);
        navigate(
          `/online-reservations/reservation-details?reservationId=${data.reservationId}`
        );
      } else {
        console.error("Failed to create reservation.");
      }
    } catch (error) {
      console.error("An error occurred while creating the reservation:", error);
    }
  }

  async function cancelReservation(reservationId: number) {
    try {
      const { data } = await api.delete(`/reservations/${reservationId}`);
      toast({
        variant: "default",
        title: `Your resrvation to ${data.restaurant_name} canceled successfuly`,
      });
    } catch (error: any) {
      console.error(error);
    }
  }

  // Format date and time
  // const formatToDateTime = (datePart: string, timePart: string): string => {
  //   const targetYear = 2024;
  //   const [_, dateString] = datePart.split(", ").map((part) => part.trim());
  //   const [month, day] = dateString.split("/").map(Number);

  //   let [hours, minutes] = time.split(":").map(Number);

  //   const formattedDate = new Date(targetYear, month - 1, day, hours, minutes);
  //   const formattedString = `${formattedDate.getFullYear()}-${(
  //     formattedDate.getMonth() + 1
  //   )
  //     .toString()
  //     .padStart(2, "0")}-${formattedDate
  //     .getDate()
  //     .toString()
  //     .padStart(2, "0")} ${formattedDate
  //     .getHours()
  //     .toString()
  //     .padStart(2, "0")}:${formattedDate
  //     .getMinutes()
  //     .toString()
  //     .padStart(2, "0")}`;

  //   return formattedString;
  // };

  return (
    <div className="w-full flex flex-col align-middle justify-center items-center">
      <div className="w-5/6 bg-greyNavbar text-center text-white my-5 py-4">
        <h1 className="text-xl my-3">
          To complete the reservation, please fill in the following details.
        </h1>
        <div className="my-3 text-greyFooterText">{`You have ${formatTime(
          timeLeft
        )} minutes to complete the details`}</div>
      </div>
      <div className="w-5/6 my-4">
        <form
          name="userData"
          className="grid grid-cols-2 w-full gap-x-16 gap-y-16 nx-4"
          onSubmit={(e) => {
            e.preventDefault(); // Prevent default form submission
            createReservation(); // Call the createReservation function
          }}
        >
          <input
            type="text"
            className="bg-transparent border-b-[1px] border-greyHoverDropDownMenu"
            name="firstName"
            placeholder="First Name *"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            className="bg-transparent border-b-[1px] border-greyHoverDropDownMenu"
            name="lastName"
            placeholder="Last Name *"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <PhoneInput setUserPhone={setUserPhone} />
          <input
            type="email"
            className="bg-transparent border-b-[1px] border-greyHoverDropDownMenu"
            name="email"
            placeholder="Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            className="bg-transparent col-span-2 border-b-[1px] border-greyHoverDropDownMenu"
            name="notes"
            placeholder="Notes"
            value={notes || ""}
            onChange={(e) => setNotes(e.target.value)}
          />

          <button
            type="submit"
            className={`flex mx-auto col-span-2 ${
              !firstName || !lastName || !userPhone || !email
                ? "bg-greyFooterText"
                : "bg-blueBtn"
            }  px-4 py-3 w-44 rounded-full text-xl font-medium align-middle items-center justify-evenly my-4`}
            disabled={!firstName || !lastName || !userPhone || !email} // Disable button if any required field is empty
          >
            <FaCheck className="text-xl" /> <span>Reserve</span>
          </button>
        </form>
      </div>

      {/* Dialog for Timeout */}
      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={() => {}}>
          <DialogContent className="text-white text-center !bg-greyDropDownMenu flex flex-col align-middle items-center max-w-[380px] min-w-[380px] px-8 max-h-[600px] min-h-[600px]">
            <WarningIcon />
            <h1 className="text-2xl font-bold mt-0">Oops...</h1>
            <p className="text-white text-center text-2xl">
              More than 5 minutes have passed since your reservation was created
              and it has expired. Please create a new reservation.
            </p>
            <p>For more assistance, please call the restaurant.</p>
            <button
              className="text-black px-7 py-3 text-xl rounded-full bg-white w-[94%] mt-4 mb-3"
              onClick={goBack}
            >
              Create New Reservation
            </button>
            <a
              className="underline text-blueBtn cursor-pointer"
              href={`tel:${restPhone}`}
            >
              Call Restaurant
            </a>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default ReservationForm;
