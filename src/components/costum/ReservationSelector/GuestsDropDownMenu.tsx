import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

function GuestsDropDownMenu() {
  return (
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
  );
}

export default GuestsDropDownMenu;
