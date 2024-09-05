import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import api from "@/services/api.services";
import { IRestaurant } from "@/types/restaurant";
import { DropdownMenuContent, Label } from "@radix-ui/react-dropdown-menu";
import { SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { RxMagnifyingGlass } from "react-icons/rx";
import GiftCard from "@/components/custom/CardsForRestaurants/GiftCard";

function GiftItPage() {
  const [allRestaurants, setAllRestaurants] = useState<IRestaurant[]>([]);
  const [restaurantsByCategory, setRestaurantsByCategory] = useState<{
    [category: string]: IRestaurant[];
  }>({});
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // Track selected categories

  useEffect(() => {
    fetchAllRests();
  }, []);

  async function fetchAllRests() {
    try {
      const { data } = await api.get("/restaurants");
      setAllRestaurants(data);
      groupRestaurantsByCategory(data); // Group restaurants by categories after fetching
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  }

  // Group restaurants by category
  function groupRestaurantsByCategory(restaurants: IRestaurant[]) {
    const grouped = restaurants.reduce((acc, restaurant) => {
      const category = restaurant.category || "Uncategorized"; // Default if no category
      const categories = category.split(","); // Split in case of multiple categories

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

  // Toggle category selection
  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prev) => prev.filter((cat) => cat !== category)); // Remove category if already selected
    } else {
      setSelectedCategories((prev) => [...prev, category]); // Add category if not selected
    }
  };

  // Get filtered restaurants based on selected categories
  const getFilteredRestaurants = () => {
    if (selectedCategories.length === 0) return allRestaurants; // Show all restaurants if no filter is applied

    return selectedCategories.flatMap(
      (category) => restaurantsByCategory[category] || []
    );
  };

  return (
    <div className="dark:bg-greyBg bg-white px-[3em]">
      <div className="pt-16 dark:text-white flex flex-col justify-center items-center">
        <h2 className="pt-[0.6em] text-[2.5em] font-rubik font-medium">
          Tabit Gift It
        </h2>
        <p className="font-normal">
          Give the gift of good food with a gift card!
        </p>
      </div>

      {/* Sticky Search and Filter Bar */}
      <div className="flex items-center sticky top-[5.2em] z-50 justify-between border-b border-greyBorder py-[1em] bg-greyBg">
        <div className="relative">
          <Label>
            <RxMagnifyingGlass className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white" />
          </Label>
          <Input
            placeholder="Search by business/city"
            className="pl-10 placeholder:text-white text-white bg-transparent"
          />
        </div>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="p-[0.5em] border rounded-md border-zinc-700">
              <div className="flex items-center justify-center">
                <SlidersHorizontal className="text-white" size={25} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-greyDropDownMenu border-none text-white p-0 rounded-[1%] font-rubik max-h-48 overflow-y-auto">
              {Object.keys(restaurantsByCategory).map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => handleCategoryToggle(category)}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Display selected categories as badges */}
      <div className="flex flex-wrap mt-4 gap-2">
        {selectedCategories.map((category) => (
          <span
            key={category}
            className="bg-blue-500 text-white py-1 px-3 rounded-full cursor-pointer"
            onClick={() => handleCategoryToggle(category)}
          >
            {category} &times; {/* "×" allows removing */}
          </span>
        ))}
      </div>

      <div className="flex flex-col mt-4">
        {/* Display restaurants based on selected categories */}
        {selectedCategories.length === 0
          ? Object.keys(restaurantsByCategory).map((category) => (
              <div key={category} className="mb-8">
                <h2 className="text-white text-2xl font-bold sticky top-[6.2em] bg-greyBg py-2 z-10">
                  {category}
                </h2>
                <div className="flex flex-wrap gap-4 mt-4 pb-3 border-b border-greyBorder">
                  {restaurantsByCategory[category].map((restaurant) => (
                    <GiftCard
                      key={restaurant.restId}
                      restaurant={restaurant}
                      buttonLabel="Get a gift card"
                      linkLabel="More information"
                    />
                  ))}
                </div>
              </div>
            ))
          : getFilteredRestaurants().map((restaurant) => (
              <GiftCard
                key={restaurant.restId}
                restaurant={restaurant}
                buttonLabel="Get a gift card"
                linkLabel="More information"
              />
            ))}
      </div>
    </div>
  );
}

export default GiftItPage;
