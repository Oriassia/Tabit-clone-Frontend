import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AvailableTablesByRestaurant, TimeSlot } from "@/types/restaurant";
import { Link, useSearchParams } from "react-router-dom";

const default_triggerClass =
  "dark:bg-greenReservationActive text-slate-50 hover:bg-slate-900/90 dark:dark:bg-greenReservationActive dark:text-slate-900 dark:hover:bg-slate-50/90";
const outline_triggerClass = "border text-white";

interface TimeSlotDialogProps {
  slot: TimeSlot;
  restWithTables: AvailableTablesByRestaurant;
}

function navToReservation() {}

const TimeSlotDialog = ({ slot, restWithTables }: TimeSlotDialogProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Dialog>
      <DialogTrigger
        disabled={slot.data?.available !== 1}
        className={`${
          slot.data?.available === 1
            ? default_triggerClass
            : outline_triggerClass
        } rounded-[4px] py-3 px-5`}
      >
        {slot.data?.time.split("T")[1] || "-"}
      </DialogTrigger>
      <DialogContent className="dark:text-white max-w-72 text-lg dark:bg-greyNavbar dark:rounded-none">
        <DialogHeader>
          <DialogTitle className="text-center">Choose Area:</DialogTitle>
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
                <Link
                  to={`/create-reservation?restId=${
                    restWithTables.restId || null
                  }&date=${slot.data?.time || null}&position=${
                    position || null
                  }&tableId=${
                    (slot.data && slot.data[position.toLowerCase()]) || null
                  }&guests=${searchParams.get("guests") || null}`}
                >
                  {position || "-"}
                </Link>
              </button>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
};
export default TimeSlotDialog;
