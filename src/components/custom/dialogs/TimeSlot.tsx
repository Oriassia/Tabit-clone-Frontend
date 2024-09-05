import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useReservation } from "@/context/ReservationContext";
import { AvailableTablesByRestaurant, TimeSlot } from "@/types/restaurant";
import { useNavigate, useSearchParams } from "react-router-dom";

const default_triggerClass =
  "dark:bg-greenReservationActive text-slate-50 hover:bg-slate-900/90 dark:dark:bg-greenReservationActive dark:text-slate-900 dark:hover:bg-slate-50/90";
const outline_triggerClass = "border text-white";

interface TimeSlotDialogProps {
  slot: TimeSlot;
  restWithTables: AvailableTablesByRestaurant;
}

function navToReservation() {}

const TimeSlotDialog = ({ slot, restWithTables }: TimeSlotDialogProps) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setRequestedReservation } = useReservation();

  function handleTableSubmit(position: string) {
    setRequestedReservation({
      dateTime: (slot.data && slot.data?.time) || "",
      guests: searchParams.get("guests") || "",
      tableId: slot.data && slot.data[position.toLowerCase()],
      position: position,
    });

    navigate(`/online-reservations?restId=${restWithTables.restId || null}`);
  }

  return (
    <Dialog>
      <DialogTrigger
        disabled={slot.data?.available !== 1}
        className={`${
          slot.data?.available === 1
            ? default_triggerClass
            : outline_triggerClass
        } rounded-[4px] font-medium py-3 px-5`}
      >
        {slot.data?.time.split("T")[1] || "-"}
      </DialogTrigger>
      <DialogContent className="dark:text-white max-w-80 text-2xl dark:bg-greyNavbar dark:rounded-none">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Choose Area:
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ul className="flex flex-col">
          {["Bar", "Inside", "Outside"].map((position, index) => (
            <li
              key={position}
              className={`${index === 2 ? "" : "border-b"}  py-3`}
            >
              <button
                onClick={navToReservation}
                disabled={
                  slot.data && slot.data[position.toLowerCase()] === null
                }
                className={`w-full text-left ${
                  slot.data && slot.data[position.toLowerCase()] === 1
                    ? "cursor-not-allowed line-through opacity-50"
                    : ""
                }`}
              >
                <button onClick={() => handleTableSubmit(position)}>
                  {position || "-"}
                </button>
              </button>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
};
export default TimeSlotDialog;
