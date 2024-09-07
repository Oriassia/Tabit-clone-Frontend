import SearchbarDialog from "@/components/SearchbarDialog";
import { useLocationsContext } from "@/context/LocationsContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { MdMyLocation } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

function AreaDropDown() {
  const {
    addedLocation,
    setLocationsCoordinates,
    getCoordinates, // Added getCoordinates to use context
  } = useLocationsContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const updateSearchParams = (title: string, value: string) => {
    searchParams.set(title, value);
    setSearchParams(searchParams);
  };

  const resetToUserLocation = () => {
    // Reset userLocation to the actual location using geolocation and update the dropdown title
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Update the user's actual geolocation in the context
          setLocationsCoordinates((prev) => ({
            ...prev,
            userLocation: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          }));
          updateSearchParams("area", "My Location"); // Update search params to "My Location"
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Callback function to update title and recenter map based on user-added location
  const handleLocationAdded = (title: string) => {
    updateSearchParams("area", title);
    const newCoordinates = getCoordinates(title); // Use getCoordinates to fetch the new center
    if (newCoordinates) {
      setLocationsCoordinates((prev) => ({
        ...prev,
        userLocation: {
          lat: newCoordinates.lat,
          lng: newCoordinates.lng,
        },
      }));
    }
  };

  return (
    <>
      <SearchbarDialog
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onLocationAdded={handleLocationAdded} // Pass the callback
      />
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none focus:ring-0 flex items-center gap-2 pb-[2em]">
          <GoDotFill className="text-greenButton items-center text-[19px]" />
          <span className="font-bold font-rubik text-white text-[19px]">
            {searchParams.get("area") || "My Location"}
          </span>
          <span
            className="border items-center flex border-greenBorderForIcon bg-transparent dark:hover:bg-transparent dark:bg-transparent p-0 px-[1.5em] h-[2.9em] hover:bg-transparent rounded-full cursor-pointer"
            onClick={resetToUserLocation} // Reset user location on SVG click
          >
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
          {/* "My Location" option */}
          <DropdownMenuItem
            className="hover:bg-greyHoverDropDownMenu cursor-pointer px-[0.6em] py-[0.7em]"
            onClick={() => {
              resetToUserLocation(); // Corrected to use resetToUserLocation()
            }}
          >
            <DropdownMenuLabel className="font-thin">
              My Location
            </DropdownMenuLabel>
          </DropdownMenuItem>

          {/* User-Added Location, if exists */}
          {addedLocation && (
            <DropdownMenuItem
              className="hover:bg-greyHoverDropDownMenu cursor-pointer px-[0.6em] py-[0.7em]"
              onClick={() => {
                updateSearchParams(
                  "area",
                  addedLocation.title || "Custom Location"
                ); // Update the title to the added location's title
                const newCoordinates = getCoordinates(
                  addedLocation.title || ""
                ); // Use getCoordinates to fetch the new center
                if (newCoordinates) {
                  setLocationsCoordinates((prev) => ({
                    ...prev,
                    userLocation: {
                      lat: newCoordinates.lat,
                      lng: newCoordinates.lng,
                    },
                  }));
                }
              }}
            >
              <DropdownMenuLabel className="font-thin">
                {addedLocation.title}
              </DropdownMenuLabel>
            </DropdownMenuItem>
          )}

          {/* Predefined Areas */}
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
              onClick={() => {
                updateSearchParams("area", location);
                const newCoordinates = getCoordinates(location); // Use getCoordinates for predefined locations
                if (newCoordinates) {
                  setLocationsCoordinates((prev) => ({
                    ...prev,
                    userLocation: {
                      lat: newCoordinates.lat,
                      lng: newCoordinates.lng,
                    },
                  }));
                }
              }}
            >
              <DropdownMenuLabel className="font-thin">
                {location}
              </DropdownMenuLabel>
            </DropdownMenuItem>
          ))}

          {/* Add New Address */}
          <DropdownMenuItem
            className="bg-greenButton flex gap-3 justify-center hover:bg-greenButtonDark text-center py-3 font-thin text-[1em] text-white cursor-pointer sticky bottom-0  font-rubik"
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <FaPlus />
            Add a new address
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default AreaDropDown;
