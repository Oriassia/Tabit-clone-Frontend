import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { FaPlus } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { MdMyLocation } from "react-icons/md";

export interface Reservation {
  dateDay: string;
  dateDayNumber: string;
  time: string;
  guests: number;
  area: string;
}

export interface ReservationSelectorProps {
  reservation: Reservation;
  onPartySizeChange: (newSize: number) => void;
}

export function ReservationSelector({
  reservation,
  onPartySizeChange,
}: ReservationSelectorProps) {
  return (
    <div className="flex border-2 rounded-full font-bold font-rubik text-white border-greenButton min-w-[350px] lg:min-w-[450px] bg-greenBg">
      <div className="flex flex-col items-center px-[30px] lg:px-[40px] py-[0.5em] lg:text-[19px] text-[15px] border-r-2 border-greenButton">
        <p className="text-[1em] font-normal">{reservation.dateDay}</p>
        <p className="lg:w-[4em]">{reservation.dateDayNumber}</p>
      </div>
      <div className="flex flex-col lg:text-[19px] px-[30px] lg:px-[45px] py-[0.5em] items-center border-r-2 border-greenButton">
        <p className="text-[1em] font-normal">Hour</p>
        <p>{reservation.time}</p>
      </div>
      <div className="flex flex-col items-center justify-center lg:text-[19px] px-[30px] lg:px-[40px] py-[0.5em]">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none focus:ring-0">
            <p className="text-[1em] font-normal">Guests</p>
            <p>{reservation.guests}</p>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-greyDropDownMenu border-none text-white p-0 rounded-[1%] font-rubik min-w-[180px] max-h-48 overflow-y-auto"
            style={{
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // Internet Explorer and Edge
            }}
          >
            <DropdownMenuItem className="rounded-none font-bold px-4 py-0 pb-4 select-none">
              How Many Guests?
            </DropdownMenuItem>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((guestNum) => (
              <DropdownMenuItem
                key={guestNum}
                className={`hover:bg-greyHoverDropDownMenu ocus:outline-none focus:ring-0 hover:border-none rounded-none cursor-pointer px-4 py-3 ${
                  guestNum === reservation.guests
                    ? "bg-greyHoverDropDownMenu"
                    : ""
                }`}
                onClick={() => onPartySizeChange(guestNum)} // Updates the state on click
              >
                <p>{guestNum}</p>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export function AreaDropdown({
  area,
  onAreaChange,
  onAddNewAddress,
}: {
  area: string;
  onAreaChange: (newArea: string) => void;
  onAddNewAddress: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none focus:ring-0 flex items-center gap-2">
        <GoDotFill className="text-greenButton items-center text-[19px]" />
        <span className="font-bold font-rubik text-white text-[19px]">
          {area}
        </span>
        <span className="border items-center flex border-greenBorderForIcon bg-transparent dark:hover:bg-transparent dark:bg-transparent p-0 px-[1.5em] h-[2.9em] hover:bg-transparent rounded-full">
          <MdMyLocation className="size-7 text-white " />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-greyDropDownMenu border-none text-white p-0 rounded-[1%] font-rubik min-w-[250px] max-h-48 overflow-y-auto relative"
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // Internet Explorer and Edge
        }}
      >
        <DropdownMenuItem className="rounded-none select-none">
          <DropdownMenuLabel className="text-gray-400 font-thin px-[0.6em] py-[0.7em] touch-none">
            Actual location unavailable
          </DropdownMenuLabel>
        </DropdownMenuItem>
        {[
          "Tel Aviv-Jaffa area",
          "Jerusalem area",
          "Haifa area",
          "Center",
          "North",
          "South",
        ].map((location) => (
          <DropdownMenuItem
            key={location}
            className="hover:bg-greyHoverDropDownMenu cursor-pointer px-[0.6em] py-[0.7em]"
            onClick={() => onAreaChange(location)}
          >
            <DropdownMenuLabel className="font-thin">
              {location}
            </DropdownMenuLabel>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          className="bg-greenButton flex gap-3 justify-center hover:bg-greenButtonDark text-center py-3 font-thin text-[1em] text-white cursor-pointer sticky bottom-0  font-rubik"
          onClick={onAddNewAddress}
        >
          <FaPlus />
          Add a new address
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
