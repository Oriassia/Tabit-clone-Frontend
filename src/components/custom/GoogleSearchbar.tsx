import React, { useEffect, useState } from "react";
import { GoogleApi } from "../../../config";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { Input } from "@/components/ui/input"; // Import ShadCN Input
import { useLocationsContext } from "@/context/LocationsContext";

// Define types for the place details and coordinates
interface PlaceDetails {
  description: string;
  coordinates: string; // "lat,lng" format
}

interface PlacesAutocompleteProps {
  onRadioChange?: (isChecked: boolean) => void; // Prop to notify parent of radio button change
}

export default function PlacesAutocomplete({
  onRadioChange = () => {},
}: PlacesAutocompleteProps) {
  // Provide a default no-op function
  const [placesWithCoordinates, setPlacesWithCoordinates] = useState<
    PlaceDetails[]
  >([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null); // State to track selected location
  const [inputValue, setInputValue] = useState<string>(""); // State to track input value
  const [isFocused, setIsFocused] = useState<boolean>(false); // State to track input focus
  const { setAddedLocation } = useLocationsContext(); // Access context functions

  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: GoogleApi,
  });

  useEffect(() => {
    // Fetch place details for each prediction to get lat, lng
    if (placePredictions.length && placesService) {
      const fetchPlaceDetails = async () => {
        const promises = placePredictions.map(
          (prediction) =>
            new Promise<PlaceDetails | null>((resolve) => {
              placesService.getDetails(
                { placeId: prediction.place_id },
                (placeDetails) => {
                  if (placeDetails && placeDetails.geometry) {
                    const location = placeDetails.geometry.location; // Get the LatLng object
                    const lat = location?.lat(); // Get latitude value
                    const lng = location?.lng(); // Get longitude value
                    resolve({
                      description: prediction.description,
                      coordinates: `${lat},${lng}`, // Use the correct lat and lng values
                    });
                  } else {
                    resolve(null);
                  }
                }
              );
            })
        );

        const results = await Promise.all(promises);
        setPlacesWithCoordinates(
          results.filter((result) => result !== null) as PlaceDetails[]
        );
      };

      fetchPlaceDetails();
    }
  }, [placePredictions, placesService]);

  // Handle radio button selection
  // Handle radio button selection
  const handleRadioChange = (coordinates: string, description: string) => {
    const [lat, lng] = coordinates
      .split(",")
      .map((coord) => parseFloat(coord.trim())); // Parse the lat and lng from the string

    if (!isNaN(lat) && !isNaN(lng)) {
      // Ensure lat and lng are valid numbers
      setSelectedLocation(coordinates); // Update local state
      setAddedLocation({ lat, lng, title: description }); // Update context state with a valid IAddedLocation object
      onRadioChange(true); // Notify parent component that a radio button is checked
    } else {
      console.error("Invalid coordinates format provided.");
    }
  };

  return (
    <>
      {/* Input Field with Floating Label Above the Textbox */}
      <div className="relative w-full mb-6">
        {/* Floating Label */}
        <label
          className={`absolute transition-all duration-300 bg-transparent px-1 pointer-events-none ${
            inputValue || isFocused
              ? "-top-4 -left-1 text-xs text-teal-400"
              : "top-3 -left-1 text-[#c9c9c9]"
          }`}
        >
          Type a place, city, or a full address
        </label>
        <Input
          type="text"
          value={inputValue}
          onFocus={() => setIsFocused(true)} // Set focus state to true
          onBlur={() => setIsFocused(false)} // Set focus state to false
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(evt.target.value);
            getPlacePredictions({
              input: evt.target.value,
              // Restrict results to Israel
              componentRestrictions: { country: "IL" },
              // types: ["address"], // Limit to addresses only
            });
          }}
          className="w-full px-0 py-4 pt-6 !bg-transparent border-b border-[#c9c9c9] text-[#c9c9c9] focus:border-teal-400 focus:text-teal-400 outline-none rounded-none"
          placeholder=" "
          aria-label="Type a place, city, or a full address" // Accessibility
        />
      </div>

      {isPlacePredictionsLoading && <p className="text-gray-400">Loading...</p>}

      {/* Location Options */}
      <ul className="space-y-3">
        {placesWithCoordinates.length ? (
          placesWithCoordinates.map((item, index) => (
            <li key={index} className="flex items-center">
              {/* Radio Button */}
              <input
                type="radio"
                id={`location-${index}`}
                name="location"
                value={item.coordinates}
                checked={selectedLocation === item.coordinates}
                onChange={() =>
                  handleRadioChange(item.coordinates, item.description)
                } // Call the handleRadioChange function
                className="custom-radio w-4 h-4 text-teal-400 bg-transparent border-gray-500 focus:ring-[#585859] focus:ring-8"
              />
              {/* Label */}
              <label
                htmlFor={`location-${index}`}
                className="ml-3 text-[#c9c9c9] text-sm px-4"
              >
                {item.description}
              </label>
            </li>
          ))
        ) : (
          <p className="text-gray-400">No suggestions available</p>
        )}
      </ul>
    </>
  );
}
