import React, { useEffect } from "react";
import GoogleSearchbar from "@/components/custom/GoogleSearchbar";
import { useLocationsContext } from "@/context/LocationsContext";

interface SearchbarDialogProps {
  isModalOpen: boolean; // Prop to control modal open state
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>; // Prop to update modal open state
  onLocationAdded: (title: string) => void; // Callback to handle location addition
}

const SearchbarDialog: React.FC<SearchbarDialogProps> = ({
  isModalOpen,
  setIsModalOpen,
  onLocationAdded,
}) => {
  const { setAddedLocation, addedLocation, setLocationsCoordinates } =
    useLocationsContext(); // Get context functions

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = () => {
    console.log("Address submitted!");

    if (
      addedLocation &&
      addedLocation.lat !== null &&
      addedLocation.lng !== null
    ) {
      // Update locationsCoordinates with the new userLocation based on addedLocation
      setLocationsCoordinates((prev) => ({
        ...prev,
        userLocation: { lat: addedLocation.lat, lng: addedLocation.lng },
      }));

      // Call the callback to update the title and recenter the map
      onLocationAdded(addedLocation.title || "Around You");
    } else {
      console.error("Invalid coordinates provided in addedLocation.");
    }

    closeModal();
  };

  // Function to handle radio selection change
  const handleRadioChange = (isChecked: boolean) => {
    if (!isChecked) setAddedLocation(null); // Clear added location if nothing is checked
  };

  // Effect to handle body overflow when the modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden"); // Prevent scrolling
    } else {
      document.body.classList.remove("overflow-hidden"); // Re-enable scrolling
    }

    return () => {
      document.body.classList.remove("overflow-hidden"); // Cleanup on component unmount
    };
  }, [isModalOpen]);

  return (
    <>
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50" // Cover the entire screen
          onClick={closeModal}
        >
          <div
            className="bg-greyDropDownMenu rounded-lg p-6 w-full max-w-md relative z-60" // Ensure higher z-index for modal content
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            {/* Modal Title */}
            <h2 className="text-white text-xl font-bold mb-4">
              Add a new address
            </h2>
            {/* Input Field */}
            <GoogleSearchbar onRadioChange={handleRadioChange} />
            {/* Buttons */}
            <div className="flex justify-center space-x-4 my-4">
              <button
                className="px-6 py-3 font-semibold text-white text-xs border-[#c9c9c9] border-[0.5px] rounded-2xl bg-transparent"
                onClick={() => {
                  setAddedLocation(null);
                  closeModal();
                }}
              >
                Cancel
              </button>
              <button
                className={`px-6 py-3 font-semibold text-xs rounded-2xl ${
                  addedLocation != null
                    ? "bg-blueBtn text-white"
                    : "bg-greyHoverDropDownMenu text-gray-500"
                }`}
                onClick={handleSubmit}
                disabled={!addedLocation} // Disable the button when no radio is checked
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchbarDialog;
