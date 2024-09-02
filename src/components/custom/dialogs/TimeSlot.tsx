import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TimeSlot } from "@/types/restaurant";

const default_triggerClass =
  "dark:bg-greenReservationActive text-slate-50 hover:bg-slate-900/90 dark:dark:bg-greenReservationActive dark:text-slate-900 dark:hover:bg-slate-50/90";
const outline_triggerClass = "border text-white";

const TimeSlotDialog: React.FC<{ slot: TimeSlot }> = ({ slot }) => (
  <Dialog>
    <DialogTrigger
      disabled={slot.data?.available !== 1}
      className={`${
        slot.data?.available === 1 ? default_triggerClass : outline_triggerClass
      } rounded-[4px] py-3 px-5`}
    >
      {slot.data?.time}
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
              disabled={slot.data && slot.data[position.toLowerCase()] === null}
              className={`w-full text-left ${
                slot.data && slot.data[position.toLowerCase()] === null
                  ? "cursor-not-allowed line-through opacity-50"
                  : ""
              }`}
            >
              {position}
            </button>
          </li>
        ))}
      </ul>
    </DialogContent>
  </Dialog>
);

export default TimeSlotDialog;
