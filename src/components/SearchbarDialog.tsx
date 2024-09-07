import React, { useState } from "react";
import GoogleSearchbar from "@/components/custom/GoogleSearchbar";
import { useLocationsContext } from "@/context/LocationsContext";

const ModalComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { setAddedLocation, addedLocation, setLocationsCoordinates } =
    useLocationsContext(); // Get context functions

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = () => {
    console.log("Address submitted!");

    if (
      addedLocation &&
      addedLocation.lat !== null &&
      addedLocation.lng !== null
    ) {
      // Update locationsCoordinates with the userLocation if lat and lng are valid
      setLocationsCoordinates((prev) => ({
        ...prev,
        userLocation: { lat: addedLocation.lat, lng: addedLocation.lng },
      }));
    } else {
      console.error("Invalid coordinates provided in addedLocation.");
    }

    closeModal();
  };

  // Function to handle radio selection change
  const handleRadioChange = (isChecked: boolean) => {
    if (!isChecked) setAddedLocation(null); // Clear added location if nothing is checked
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Button to Open Modal */}
      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-greyDropDownMenu rounded-lg p-6 w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            {/* Modal Title */}
            <h2 className="text-white text-xl font-bold mb-4">
              Add a new address
            </h2>
            {/* Input Field */}
            <GoogleSearchbar onRadioChange={handleRadioChange} />{" "}
            {/* Pass the prop correctly */}
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
                className={`px-6 py-3 font-semibold text-xs border-[#c9c9c9] border-[0.5px] rounded-2xl ${
                  addedLocation != null
                    ? "bg-transparent text-white"
                    : "bg-white text-gray-500"
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
    </div>
  );
};

export default ModalComponent;
