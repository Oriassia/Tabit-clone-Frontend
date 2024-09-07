import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { BsGlobe2 } from "react-icons/bs";

function LanguagesDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-greyBorder hover:text-gray-300 transition duration-200 cursor-pointer">
        <BsGlobe2 size={28} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-greyNavbar items-center font-normal text-center">
        <DropdownMenuItem
          disabled={true}
          className="border-b p-2 text-gray-400 line-through"
        >
          English
        </DropdownMenuItem>

        <DropdownMenuItem className="p-2">עברית</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguagesDropDown;
