import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LucideMenu, PersonStanding } from "lucide-react";
import { NavLink } from "react-router-dom";

function SideMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button>
          <LucideMenu className=" hover:text-gray-300 transition duration-200 cursor-pointer text-greenHamburger" />
        </button>
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="font-rubik bg-greyNavbar text-white "
      >
        <SheetHeader className="mb-8">
          <SheetClose asChild>
            <button>
              <LucideMenu className=" hover:text-gray-300 transition duration-200 cursor-pointer text-greenHamburger" />
            </button>
          </SheetClose>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <nav className="flex flex-col gap-5 font-semibold text-lg">
          <div>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? `text-greenHamburger transition duration-200`
                  : "hover:text-gray-300 transition duration-200"
              }
            >
              Main
            </NavLink>
          </div>
          <hr />
          <div>
            <NavLink
              to="/book-a-table"
              className={({ isActive }) =>
                isActive
                  ? `text-greenHamburger transition duration-200`
                  : "hover:text-gray-300 transition duration-200"
              }
            >
              Reserve a table
            </NavLink>
          </div>
          <hr />
          <div>
            <NavLink
              to="/deliveries"
              className={({ isActive }) =>
                isActive
                  ? `text-greenHamburger transition duration-200`
                  : "hover:text-gray-300 transition duration-200"
              }
            >
              Deliveries & Takeouts
            </NavLink>
          </div>
          <hr />
          <div>
            <NavLink
              to="/restaurants"
              className={({ isActive }) =>
                isActive
                  ? `text-greenHamburger transition duration-200`
                  : "hover:text-gray-300 transition duration-200"
              }
            >
              Restaurants
            </NavLink>
          </div>
          <hr />
          <div>
            <NavLink
              to="/gift-it"
              className={({ isActive }) =>
                isActive
                  ? `text-greenHamburger transition duration-200`
                  : "hover:text-gray-300 transition duration-200"
              }
            >
              Tabit Gift it
            </NavLink>
          </div>
          <hr />
          <div>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? `text-greenHamburger transition duration-200`
                  : "hover:text-gray-300 transition duration-200"
              }
            >
              Restaurant owner?
            </NavLink>
          </div>
          <hr />
          <div>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? `text-greenHamburger flex gap-4 transition duration-200`
                  : "hover:text-gray-300 flex gap-4 transition duration-200"
              }
            >
              <span>Accessibility Statement</span>
              <PersonStanding />
            </NavLink>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default SideMenu;
