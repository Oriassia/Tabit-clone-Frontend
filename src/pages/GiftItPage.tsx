import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import api from "@/services/api.services";
import { IRestaurant } from "@/types/restaurant";
import { SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { RxMagnifyingGlass } from "react-icons/rx";
import GiftCard from "@/components/custom/CardsForRestaurants/GiftCard";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "react-router-dom";

function GiftItPage() {
  const [allRestaurants, setAllRestaurants] = useState<IRestaurant[]>([]);
  const [restaurantsByCategory, setRestaurantsByCategory] = useState<{
    [category: string]: IRestaurant[];
  }>({});
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetchAllRests();
  }, []);

  useEffect(() => {
    groupRestaurantsByCategory(
      allRestaurants.filter(
        (restaurant) =>
          restaurant.name &&
          restaurant.name.includes(searchParams.get("search-value") || "")
      )
    );
  }, [searchParams]);

  async function fetchAllRests() {
    try {
      const { data } = await api.get("/restaurants");
      setAllRestaurants(data);
      groupRestaurantsByCategory(data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  }

  function groupRestaurantsByCategory(restaurants: IRestaurant[]) {
    const grouped = restaurants.reduce((acc, restaurant) => {
      const category = restaurant.category || "Uncategorized";
      const categories = category
        .split(",")
        .map((cat) => cat.replace(/\s*\|\s*$/, "").trim());

      categories.forEach((cat) => {
        const trimmedCategory = cat.trim();
        if (!acc[trimmedCategory]) {
          acc[trimmedCategory] = [];
        }
        acc[trimmedCategory].push(restaurant);
      });

      return acc;
    }, {} as { [category: string]: IRestaurant[] });

    setRestaurantsByCategory(grouped);
  }

  const handleCategoryToggle = (
    ev: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    category: string
  ) => {
    ev.preventDefault();
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(category)) {
        return prevSelected.filter((cat) => cat !== category);
      } else {
        return [...prevSelected, category];
      }
    });
  };

  return (
    <div className="dark:bg-greyBg bg-white px-[3em]">
      <div className="pt-24 dark:text-white flex flex-col justify-center items-center">
        <h2 className="pt-[0.3em] text-[2.8em] font-rubik font-medium">
          Tabit Gift It
        </h2>
        <p className="font-normal text-lg">
          Give the gift of good food with a gift card!
        </p>
      </div>

      <div className="flex items-center sticky top-[5.7em] z-50 justify-between border-b-2 border-greyNavbar px-[1em] py-[1em] bg-greyBg">
        <div className="relative lg:w-[20em]">
          <Label>
            <RxMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-[1.5em]" />
          </Label>
          <Input
            placeholder="Search by business/city"
            className="pl-14 py-6 w-full placeholder:text-white placeholder:text-lg text-white bg-transparent"
            value={searchParams.get("search-value") || ""}
            onChange={(ev) =>
              setSearchParams((prev) => {
                const params = new URLSearchParams(prev);
                params.set("search-value", ev.currentTarget.value);
                return params;
              })
            }
          />
        </div>

        {selectedCategories.length > 0 && (
          <div className="flex justify-center mt-4 gap-2">
            {selectedCategories.map((category) => (
              <span
                key={category}
                className="text-white py-1 flex border border-greyNavbar rounded-3xl items-center gap-2 px-3 cursor-pointer"
                onClick={(ev) => handleCategoryToggle(ev, category)}
              >
                <p className="border text-[1em] text-black border-greenBorder rounded-full px-2 h-fit bg-greenButton">
                  &times;
                </p>
                <p className="text-[1em]">{category}</p>
              </span>
            ))}
          </div>
        )}

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="p-[0.5em] border rounded-md border-zinc-700">
              <SlidersHorizontal className="text-white" size={25} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="absolute bg-greyDropDownMenu right-5 border-none text-white p-0 rounded-[1%] font-rubik max-h-[25em] overflow-y-auto">
              {Object.keys(restaurantsByCategory).map((category) => (
                <DropdownMenuCheckboxItem
                  className={`bg-greyDropDownMenu py-[0.5em] px-[2em] text-[1.2em] rounded-none hover:bg-greyHoverDropDownMenu ${
                    selectedCategories.includes(category)
                      ? "text-greenButton"
                      : ""
                  }`}
                  key={category}
                  checked={selectedCategories.includes(category)}
                  onClick={(ev) => handleCategoryToggle(ev, category)}
                >
                  {category}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex flex-col mt-4">
        {selectedCategories.length === 0
          ? Object.keys(restaurantsByCategory).map((category) => (
              <div key={category} className="mb-8">
                <h2 className="text-white text-2xl font-bold sticky top-[6.5em] bg-greyBg py-2 z-10">
                  {category}
                </h2>
                <div className="flex flex-wrap  gap-4 mt-4 pb-3 border-b border-greyNavbar">
                  {restaurantsByCategory[category].map((restaurant) => (
                    <GiftCard key={restaurant.restId} restaurant={restaurant} />
                  ))}
                </div>
              </div>
            ))
          : selectedCategories.map((category) => (
              <div key={category} className="mb-8">
                <h2 className="text-white text-2xl font-bold sticky top-[6.2em] bg-greyBg py-2 z-10">
                  {category}
                </h2>
                <div className="flex flex-wrap gap-4 mt-4 pb-3 border-b border-greyNavbar">
                  {restaurantsByCategory[category]?.length > 0 ? (
                    restaurantsByCategory[category].map((restaurant) => (
                      <GiftCard
                        key={restaurant.restId}
                        restaurant={restaurant}
                      />
                    ))
                  ) : (
                    <p>No restaurants available for {category}</p>
                  )}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default GiftItPage;
