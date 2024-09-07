import { IAddedLocation, ILocationsCoordinates } from "@/types/restaurant";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface Coordinates {
  lat: number;
  lng: number;
}

// Define the context value type
interface LocationsContextType {
  locationsCoordinates: ILocationsCoordinates;
  setLocationsCoordinates: React.Dispatch<
    React.SetStateAction<ILocationsCoordinates>
  >;
  addedLocation: IAddedLocation | null; // Initialize with null to avoid any potential errors when rendering
  setAddedLocation: React.Dispatch<React.SetStateAction<IAddedLocation | null>>;
  getCoordinates: (areaName: string) => Coordinates | undefined; // Define return type here
}

// Create the context with a default value
const LocationsContext = createContext<LocationsContextType | undefined>(
  undefined
);

// Define the provider component
export const LocationsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // const [usersLocation, setUsersLocation] = useState({}); // Initialize with Tel Aviv coordinates

  const [locationsCoordinates, setLocationsCoordinates] =
    useState<ILocationsCoordinates>({
      userLocation: { lat: null, lng: null },
      telAviv: { lat: 32.0661, lng: 34.7748 },
      Jerusalem: { lat: 31.77483019358372, lng: 35.21428562038993 },
      haifa: { lat: 32.809828135605215, lng: 34.99704719664554 },
      center: { lat: 31.887834704998507, lng: 35.01055876177554 },
      north: { lat: 32.96925256257092, lng: 35.54208636594151 },
      south: { lat: 29.556705981052822, lng: 34.95112725113618 },
    });
  const [addedLocation, setAddedLocation] = useState<IAddedLocation | null>(
    null
  );
  useEffect(() => {
    const fetchUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocationsCoordinates((prev) => ({
              ...prev,
              userLocation: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
            }));
          },
          (error) => {
            console.error("Error getting location:", error);
            // Keep Tel Aviv as default if there's an error
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        // Keep Tel Aviv as default
      }
    };

    fetchUserLocation();
  }, []);

  function getCoordinates(areaName: string): Coordinates | undefined {
    // 1. If the areaName matches "My Location", return userLocation coordinates.
    if (areaName === "My Location") {
      if (
        locationsCoordinates.userLocation.lat !== null &&
        locationsCoordinates.userLocation.lng !== null
      ) {
        return {
          lat: locationsCoordinates.userLocation.lat,
          lng: locationsCoordinates.userLocation.lng,
        };
      }
      // If userLocation is not available, fallback to Tel Aviv coordinates.
      return {
        lat: locationsCoordinates.telAviv.lat || 32.0661,
        lng: locationsCoordinates.telAviv.lng || 34.7748,
      };
    }

    // 2. If an addedLocation exists and matches the areaName, return addedLocation coordinates.
    if (addedLocation && areaName === addedLocation.title) {
      return {
        lat: addedLocation.lat || 32.0661, // Fallback to Tel Aviv coordinates if null
        lng: addedLocation.lng || 34.7748,
      };
    }

    // 3. Handle predefined area names and return their respective coordinates.
    switch (areaName) {
      case "Tel Aviv-Jaffa area":
        return {
          lat: locationsCoordinates.telAviv.lat || 32.0661,
          lng: locationsCoordinates.telAviv.lng || 34.7748,
        };

      case "Jerusalem area":
        return {
          lat: locationsCoordinates.Jerusalem.lat || 31.7748,
          lng: locationsCoordinates.Jerusalem.lng || 35.2143,
        };

      case "Haifa area":
        return {
          lat: locationsCoordinates.haifa.lat || 32.8098,
          lng: locationsCoordinates.haifa.lng || 34.997,
        };

      case "Center":
        return {
          lat: locationsCoordinates.center.lat || 31.8878,
          lng: locationsCoordinates.center.lng || 35.0106,
        };

      case "North":
        return {
          lat: locationsCoordinates.north.lat || 32.9693,
          lng: locationsCoordinates.north.lng || 35.5421,
        };

      case "South":
        return {
          lat: locationsCoordinates.south.lat || 29.5567,
          lng: locationsCoordinates.south.lng || 34.9511,
        };

      default:
        // 4. Return default coordinates (Tel Aviv) if areaName doesn't match any predefined areas.
        return { lat: 32.0661, lng: 34.7748 };
    }
  }

  return (
    <LocationsContext.Provider
      value={{
        locationsCoordinates,
        setLocationsCoordinates,
        getCoordinates,
        setAddedLocation,
        addedLocation,
      }}
    >
      {children}
    </LocationsContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useLocationsContext = (): LocationsContextType => {
  const context = useContext(LocationsContext);
  if (!context) {
    throw new Error(
      "useLocationsContext must be used within a LocationsProvider"
    );
  }
  return context;
};
