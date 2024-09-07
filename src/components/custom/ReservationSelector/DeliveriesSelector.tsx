import { useReservation } from "@/context/ReservationContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useSearchParams } from "react-router-dom";

function DeliveriesSelector() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { allCategories } = useReservation();

  // Update search params for a category
  const updateSearchParams = (title: string, value: string) => {
    searchParams.set(title, value);
    setSearchParams(searchParams);
  };

  // Clear category filter
  const clearCategory = () => {
    searchParams.delete("category");
    setSearchParams(searchParams);
  };

  return (
    <>
      <div className="grid grid-cols-1 w-full border-2 rounded-[35px] font-bold font-rubik text-white border-greenButton bg-greenBg">
        {/* deliveries Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none focus:ring-0 flex flex-col items-center py-[0.5em] lg:text-[19px] text-[15px] border-b  border-greenButton">
            <div className="font-thin">Service</div>
            <div>{searchParams.get("service") || "Service"}</div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-greyDropDownMenu border-none text-white rounded-[1%] w-[250px] font-rubik max-h-48 overflow-y-auto"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {["Deliveries", "Take out"].map((service) => (
              <DropdownMenuItem
                key={service}
                className={`hover:bg-greyHoverDropDownMenu focus:outline-none focus:ring-0 hover:border-none rounded-none cursor-pointer px-4 py-3 font-normal ${
                  service === searchParams.get("service")
                    ? "bg-greyHoverDropDownMenu"
                    : ""
                }`}
                onClick={() =>
                  updateSearchParams("service", service.toLowerCase())
                }
              >
                <p>{service}</p>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Tags Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none focus:ring-0 flex flex-col items-center py-[0.5em] lg:text-[19px] text-[15px] border-greenButton">
            <div>{searchParams.get("category") || "Tags"}</div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-greyDropDownMenu border-none text-white rounded-[1%] w-[250px] font-rubik max-h-48 overflow-y-auto"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <DropdownMenuItem
              onClick={clearCategory}
              className="hover:bg-greyHoverDropDownMenu focus:outline-none focus:ring-0 hover:border-none rounded-none cursor-pointer px-4 py-3 font-bold"
            >
              Clear Tags
            </DropdownMenuItem>
            {allCategories.map((category) => (
              <DropdownMenuItem
                key={category}
                className={`hover:bg-greyHoverDropDownMenu focus:outline-none focus:ring-0 hover:border-none rounded-none cursor-pointer px-4 py-3 font-normal ${
                  category === searchParams.get("category")
                    ? "bg-greyHoverDropDownMenu"
                    : ""
                }`}
                onClick={() =>
                  updateSearchParams("category", category.toLowerCase())
                }
              >
                <p>{category}</p>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}

export default DeliveriesSelector;
