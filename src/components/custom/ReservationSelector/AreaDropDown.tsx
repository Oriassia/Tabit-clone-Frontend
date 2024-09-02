import { useUserContext } from "@/context/UserContext";
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

function AreaDropDown({
  updateSearchParams,
  onAddNewAddress,
  searchParams,
}: {
  updateSearchParams: (title: string, value: string) => void;
  onAddNewAddress: () => void;
  searchParams: URLSearchParams;
}) {
  const { usersLocation } = useUserContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none focus:ring-0 flex items-center gap-2 pb-[2em]">
        <GoDotFill className="text-greenButton items-center text-[19px]" />
        <span className="font-bold font-rubik text-white text-[19px]">
          {searchParams.get("area")}
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
        <DropdownMenuItem
          className="hover:bg-greyHoverDropDownMenu cursor-pointer px-[0.6em] py-[0.7em]"
          onClick={() => updateSearchParams("area", "Around me")}
        >
          <DropdownMenuLabel className="font-thin">
            {usersLocation ? "Around me" : "Actual location unavailable"}
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
            onClick={() => updateSearchParams("area", location)}
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

export default AreaDropDown;
