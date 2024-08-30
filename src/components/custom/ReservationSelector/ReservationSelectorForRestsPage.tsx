import { IInputData } from "@/pages/RestaurantsPage";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

interface ReservationSelectorProps {
  InputData: IInputData;
  handleCategoryChange: (newSize: number) => void;
}

function ReservationSelectorForRestsPage({
  InputData,
  handleCategoryChange,
}: ReservationSelectorProps) {
  return (
    <div className="flex border-2 rounded-full font-bold font-rubik text-white border-greenButton min-w-[350px] lg:min-w-[450px] bg-greenBg ">
      {/* category Selection */}
      <div className="flex flex-col items-center justify-center lg:text-[19px] px-[30px] lg:px-[40px] py-[0.5em]">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none focus:ring-0">
            <p className="text-[1em] font-normal">Category</p>
            <p>{InputData.category}</p>
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
                className={`hover:bg-greyHoverDropDownMenu focus:outline-none focus:ring-0 hover:border-none rounded-none cursor-pointer px-4 py-3 ${
                  guestNum === InputData.guests
                    ? "bg-greyHoverDropDownMenu"
                    : ""
                }`}
                onClick={() => handleCategoryChange(guestNum)}
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

export default ReservationSelectorForRestsPage;
