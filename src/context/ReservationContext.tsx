import React, { createContext, useContext, useState, useEffect } from "react";
import { IRestaurant } from "@/types/restaurant";
import api from "@/services/api.services";
import { useSearchParams } from "react-router-dom";
import { parseISOToDate } from "@/services/time.services"; // Import utility function for date-time formatting

export interface IRequestedReservation {
  dateTime: string;
  tableId: string;
  position: string;
  guests: string;
}

// Define types for context state
interface ReservationContextType {
  requestedReservation: IRequestedReservation | null;
  setRequestedReservation: (
    requestedReservationData: IRequestedReservation | null
  ) => void;

  allCategories: string[];
  restaurant: IRestaurant | null;
  setRestaurant: (restaurant: IRestaurant | null) => void;
  restId: string | null;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedHour: string;
  setSelectedHour: (hour: string) => void;
  selectedGuests: string;
  setSelectedGuests: (guests: string) => void;
  selectedPosition: string | null;
  setSelectedPosition: (position: string | null) => void;
  tableId: string;
  setTableId: (id: string) => void;
  likeWantedTables: any[];
  setLikeWantedTables: (tables: any[]) => void;
  allTables: any[];
  positions: any[];
  getAllTables: (restIdGiven?: string) => void;
  getTablesPositions: () => void;
  resetReservation: () => void; // Added resetReservation function type
}

// Create context
const ReservationContext = createContext<ReservationContextType | undefined>(
  undefined
);

// Context provider component
export const ReservationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [requestedReservation, setRequestedReservation] =
    useState<IRequestedReservation | null>(null);

  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedHour, setSelectedHour] = useState<string>("");
  const [selectedGuests, setSelectedGuests] = useState<string>("2");
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [tableId, setTableId] = useState<string>("0");
  const [likeWantedTables, setLikeWantedTables] = useState<any[]>([]);
  const [allTables, setAllTables] = useState<any[]>([]); // State for all tables
  const [positions, setPositions] = useState<any[]>([]); // State for table `positions`
  const [searchParams] = useSearchParams();
  const restId = searchParams.get("restId");
  const [allCategories, setAllCategories] = useState<string[]>([]); // State for all categories

  // Fetch restaurant data based on restId
  useEffect(() => {
    async function getRestaurantData() {
      if (restId) {
        try {
          const { data } = await api.get(`/restaurants/${restId}`);
          setRestaurant(data[0]);
        } catch (error) {
          console.error("Failed to fetch restaurant data:", error);
        }
      }
    }
    getRestaurantData();
  }, [restId]);

  useEffect(() => {
    async function setAllCategoriesFromRests() {
      try {
        const { data } = await api.get<IRestaurant[]>("/restaurants");
        const filtered = data.reduce<string[]>((acc, rest) => {
          if (rest.category) {
            const categories = rest.category
              .split(",")
              .map((cat) => cat.replace(/\s*\|\s*/g, "").trim()); // Remove "|" and trim spaces
            categories.forEach((cat) => {
              if (!acc.includes(cat)) {
                acc.push(cat);
              }
            });
          }
          return acc;
        }, []);
        setAllCategories(filtered);
      } catch (error) {
        console.error("Failed to fetch restaurant data:", error);
      }
    }

    setAllCategoriesFromRests();
  }, []);

  // Fetch all tables data
  const getAllTables = async (restIdGiven?: string) => {
    if (restIdGiven) {
      console.log(restIdGiven);

      try {
        const { data } = await api.get(`/tables/${restIdGiven}`);

        setAllTables(
          data.map((table: any) => ({
            ...table,
            DateTime: parseISOToDate(table.DateTime), // Ensure all tables have formatted date-time
          }))
        );
      } catch (error) {
        console.error("Failed to fetch tables:", error);
      }
    } else if (restId) {
      try {
        const { data } = await api.get(`/tables/${restId}`);
        console.log(data);

        setAllTables(
          data.map((table: any) => ({
            ...table,
            DateTime: parseISOToDate(table.DateTime), // Ensure all tables have formatted date-time
          }))
        );
      } catch (error) {
        console.error("Failed to fetch tables:", error);
      }
    }
  };

  // Fetch all positions data
  const getTablesPositions = async () => {
    if (restId) {
      try {
        const { data } = await api.get(`/tables/position/${restId}`);
        setPositions(data);

        if (!selectedPosition) {
          setSelectedPosition(data[0].position);
        }
      } catch (error) {
        console.error("Failed to fetch tables positions:", error);
      }
    }
  };

  // Function to reset all states to initial values
  const resetReservation = () => {
    setRestaurant(null);
    setSelectedDate("");
    setSelectedHour("");
    setSelectedGuests("2");
    setSelectedPosition(null);
    setTableId("0");
    setLikeWantedTables([]);
    setAllTables([]);
    setPositions([]);
  };

  useEffect(() => {
    if (restId) {
      getAllTables();
      getTablesPositions();
    }
  }, [restId]);

  return (
    <ReservationContext.Provider
      value={{
        allCategories,
        requestedReservation,
        setRequestedReservation,
        restaurant,
        setRestaurant,
        restId,
        selectedDate,
        setSelectedDate,
        selectedHour,
        setSelectedHour,
        selectedGuests,
        setSelectedGuests,
        selectedPosition,
        setSelectedPosition,
        tableId,
        setTableId,
        likeWantedTables,
        setLikeWantedTables,
        allTables,
        positions,
        getAllTables,
        getTablesPositions,
        resetReservation, // Added to context value
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

// Custom hook to use reservation context
export const useReservation = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error("useReservation must be used within a ReservationProvider");
  }
  return context;
};
