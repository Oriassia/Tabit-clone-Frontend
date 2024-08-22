import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LucideMenu } from "lucide-react";
import { Link } from "react-router-dom";

function SideMenu() {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <LucideMenu />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              <LucideMenu />
            </SheetTitle>
            <SheetDescription>
              <div title="Navigation" className="flex gap-6">
                <Link to={"/book-a-table"}>Main</Link>
                <Link to={"/book-a-table"}>Reserve a table</Link>
                <Link to={"/deliveries"}>Deliveries & Takeouts</Link>
                <Link to={"/restaurants"}>Restaurants</Link>
                <Link to={"/gift-it"}>Tabit Gift it</Link>
                <Link to={"/"}>Restaurant owner?</Link>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default SideMenu;
