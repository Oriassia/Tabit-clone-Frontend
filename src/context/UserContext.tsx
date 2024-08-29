import { ILocation } from "@/types/restaurant";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

// Define the context value type
interface UserContextType {
  usersLocation: ILocation;
  setUsersLocation: React.Dispatch<React.SetStateAction<ILocation>>;
}

const telAvivCoordinates: ILocation = {
  lat: 32.0853,
  lng: 34.7818,
};

// Create the context with a default value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Define the provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [usersLocation, setUsersLocation] =
    useState<ILocation>(telAvivCoordinates); // Initialize with Tel Aviv coordinates

  useEffect(() => {
    const fetchUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUsersLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
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

  return (
    <UserContext.Provider value={{ usersLocation, setUsersLocation }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
