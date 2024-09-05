import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useSearchParams } from "react-router-dom";

function TagsSelector() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = [
    "Middle Eastern",
    "Bar",
    "Mediterranean",
    "Hotel",
    "Restaurant",
    "Grill",
    "Seafood",
    "Greek",
    "French",
    "Bistro",
    "Contemporary",
    "Fusion",
    "Asian",
  ];

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
    <DropdownMenu>
      <DropdownMenuTrigger className="lg:text-[19px] focus:outline-none focus:ring-0 border-2 rounded-full font-bold font-rubik text-white border-greenButton h-14 w-full content-center bg-greenBg">
        <div>{searchParams.get("category") || "Tags"}</div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-greyDropDownMenu border-none text-white p-0 rounded-[1%] font-rubik min-w-[180px] max-h-48 overflow-y-auto"
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
        {categories.map((category) => (
          <DropdownMenuItem
            key={category}
            className={`hover:bg-greyHoverDropDownMenu focus:outline-none focus:ring-0 hover:border-none rounded-none cursor-pointer px-4 py-3 font-normal ${
              category === searchParams.get("category")
                ? "bg-greyHoverDropDownMenu"
                : ""
            }`}
            onClick={() => updateSearchParams("category", category)}
          >
            <p>{category}</p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TagsSelector;
