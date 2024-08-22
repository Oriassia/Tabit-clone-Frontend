import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LucideMenu, PersonStanding } from "lucide-react";
import { Link } from "react-router-dom";

function SideMenu() {
  return (
    <Sheet>
      <SheetTrigger>
        <LucideMenu className="text-white hover:text-gray-300 transition duration-200 cursor-pointer" />
      </SheetTrigger>
      <SheetContent side={"left"} className="bg-greyNavbar text-white">
        <SheetDescription className="font-bold text-2xl">
          <SheetClose className="mb-12">
            <LucideMenu />
          </SheetClose>
          <div title="Navigation" className="flex flex-col gap-6">
            <Link
              to={"/"}
              className="hover:text-gray-300 transition duration-200"
            >
              Main
            </Link>
            <Separator />
            <Link
              to={"/book-a-table"}
              className="hover:text-gray-300 transition duration-200"
            >
              Reserve a table
            </Link>
            <Separator />
            <Link
              to={"/deliveries"}
              className="hover:text-gray-300 transition duration-200"
            >
              Deliveries & Takeouts
            </Link>
            <Separator />
            <Link
              to={"/restaurants"}
              className="hover:text-gray-300 transition duration-200"
            >
              Restaurants
            </Link>
            <Separator />
            <Link
              to={"/gift-it"}
              className="hover:text-gray-300 transition duration-200"
            >
              Tabit Gift it
            </Link>
            <Separator />
            <Link
              to={"/"}
              className="hover:text-gray-300 transition duration-200"
            >
              Restaurant owner?
            </Link>
            <Separator />
            <Link
              to={"/"}
              className="flex gap-4 hover:text-gray-300 transition duration-200"
            >
              <span>Accessibility Statement</span>
              <PersonStanding />
            </Link>
          </div>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}

export default SideMenu;
