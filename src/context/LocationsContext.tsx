import { ILocationsCoordinates } from "@/types/restaurant";
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

  function getCoordinates(areaName: string) {
    switch (areaName) {
      case "Around me":
        if (
          locationsCoordinates.userLocation.lat &&
          locationsCoordinates.userLocation.lng
        ) {
          return {
            lat: locationsCoordinates.userLocation.lat,
            lng: locationsCoordinates.userLocation.lng,
          };
        }
        return {
          lat: locationsCoordinates.telAviv.lat || 0,
          lng: locationsCoordinates.telAviv.lng || 0,
        };

      case "Tel Aviv-Jaffa area":
        return {
          lat: locationsCoordinates.telAviv.lat || 0,
          lng: locationsCoordinates.telAviv.lng || 0,
        };

      case "Jerusalem area":
        return {
          lat: locationsCoordinates.Jerusalem.lat || 0,
          lng: locationsCoordinates.Jerusalem.lng || 0,
        };

      case "Haifa area":
        return {
          lat: locationsCoordinates.haifa.lat || 0,
          lng: locationsCoordinates.haifa.lng || 0,
        };

      case "Center":
        return {
          lat: locationsCoordinates.center.lat || 0,
          lng: locationsCoordinates.center.lng || 0,
        };

      case "North":
        return {
          lat: locationsCoordinates.north.lat || 0,
          lng: locationsCoordinates.north.lng || 0,
        };

      case "South":
        return {
          lat: locationsCoordinates.south.lat || 0,
          lng: locationsCoordinates.south.lng || 0,
        };

      default:
        return { lat: 32.0661, lng: 34.7748 }; // Return default coordinates if areaName doesn't match
    }
  }

  return (
    <LocationsContext.Provider
      value={{
        locationsCoordinates,
        setLocationsCoordinates,
        getCoordinates,
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
