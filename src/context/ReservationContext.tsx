import React, { createContext, useContext, useState, useEffect } from "react";
import { IRestaurant } from "@/types/restaurant";
import api from "@/services/api.services";
import { useSearchParams } from "react-router-dom";

// Define types for context state
interface ReservationContextType {
  restaurant: IRestaurant | null;
  setRestaurant: (restaurant: IRestaurant | null) => void;
  restId: string;
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
  getLikeTables: () => void;
  getAllTables: () => void;
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
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedHour, setSelectedHour] = useState<string>("");
  const [selectedGuests, setSelectedGuests] = useState<string>("2");
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [tableId, setTableId] = useState<string>("0");
  const [likeWantedTables, setLikeWantedTables] = useState<any[]>([]);
  const [allTables, setAllTables] = useState<any[]>([]); // State for all tables
  const [positions, setPositions] = useState<any[]>([]); // State for table positions
  const [searchParams] = useSearchParams();
  const restId = searchParams.get("restid") || "0";

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

  // Fetch all tables data
  const getAllTables = async () => {
    if (restId) {
      try {
        const { data } = await api.get(`/tables/${restId}`);
        setAllTables(data);
        console.log(data);
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

  // Function to get like tables
  const getLikeTables = () => {
    if (
      !selectedDate ||
      !selectedHour ||
      !selectedPosition ||
      !selectedGuests
    ) {
      console.error(
        "Incomplete selection criteria. Ensure date, time, position, and guests are selected."
      );
      return;
    }

    // Manually construct selectedDateTime and nextDayDateTime to ensure the year is set to 2024
    const datePart = selectedDate.split(", ")[1];
    const [month, day] = datePart.split("/").map(Number);
    const [hours, minutes] = selectedHour.split(":").map(Number);

    const selectedDateTime = new Date(2024, month - 1, day, hours, minutes); // Manually set year to 2024
    const nextDayDateTime = new Date(2024, month - 1, day + 1, hours, minutes); // Manually add 1 day

    // Convert selectedGuests to a number for comparison
    const guestsCount = parseInt(selectedGuests, 10);

    // 2.5 hours window in milliseconds
    const timeWindowMs = 2.5 * 3600000;

    // Filter likeWantedTables based on criteria
    const filteredTables = allTables.filter((table) => {
      const tableDateTime = new Date(table.DateTime);
      const tableDate = tableDateTime.toISOString().split("T")[0]; // Get date part
      const selectedDateStr = selectedDateTime.toISOString().split("T")[0]; // Get date part
      const nextDayDateStr = nextDayDateTime.toISOString().split("T")[0]; // Get next day date part
      const timeDifference = Math.abs(
        selectedDateTime.getTime() - tableDateTime.getTime()
      );
      const timeDifferenceNextDay = Math.abs(
        nextDayDateTime.getTime() - tableDateTime.getTime()
      );
      const isSameDate = tableDate === selectedDateStr;
      const isNextDay = tableDate === nextDayDateStr;
      const isCapacitySufficient = parseInt(table.Capacity, 10) >= guestsCount; // Check capacity

      // Rule 1: Same Date, Same Hour, Different Position, Capacity sufficient
      if (
        isSameDate &&
        selectedHour === table.DateTime.split(" ")[1] &&
        table.Position !== selectedPosition &&
        isCapacitySufficient
      ) {
        return true;
      }

      // Rule 2: Same Date, Within ±2.5 Hours, Same Position, Capacity sufficient
      if (
        isSameDate &&
        timeDifference <= timeWindowMs &&
        table.Position === selectedPosition &&
        isCapacitySufficient
      ) {
        return true;
      }

      // Rule 3: Same Date, Within ±2.5 Hours, Different Position, Capacity sufficient
      if (
        isSameDate &&
        timeDifference <= timeWindowMs &&
        table.Position !== selectedPosition &&
        isCapacitySufficient
      ) {
        return true;
      }

      // Rule 4: Next Day, Within ±2.5 Hours, Same Position, Capacity sufficient
      if (
        isNextDay &&
        timeDifferenceNextDay <= timeWindowMs &&
        table.Position === selectedPosition &&
        isCapacitySufficient
      ) {
        return true;
      }

      // Rule 5: Next Day, Within ±2.5 Hours, Different Position, Capacity sufficient
      if (
        isNextDay &&
        timeDifferenceNextDay <= timeWindowMs &&
        table.Position !== selectedPosition &&
        isCapacitySufficient
      ) {
        return true;
      }

      // Rule 6: Next Day, Same Hour, Same Position, Capacity sufficient
      if (
        isNextDay &&
        selectedHour === table.DateTime.split(" ")[1] &&
        table.Position === selectedPosition &&
        isCapacitySufficient
      ) {
        return true;
      }

      // Rule 7: Next Day, Same Hour, Different Position, Capacity sufficient
      if (
        isNextDay &&
        selectedHour === table.DateTime.split(" ")[1] &&
        table.Position !== selectedPosition &&
        isCapacitySufficient
      ) {
        return true;
      }

      return false; // If none of the rules match, it's not a "like" table.
    });

    // Helper function to get top 5 closest tables for each position and day, avoiding duplicate hours
    const getTop5ClosestTables = (tables: any[], targetDate: Date) => {
      // Group tables by position
      const groupedByPosition = tables.reduce((acc: any, table: any) => {
        if (!acc[table.Position]) acc[table.Position] = [];
        acc[table.Position].push(table);
        return acc;
      }, {});

      // Remove duplicate hours for each position
      const removeDuplicateHours = (tables: any[]) => {
        const uniqueByHour: { [key: string]: any } = {};
        tables.forEach((table) => {
          const hour = table.DateTime.split(" ")[1]; // Get the hour part of DateTime
          if (!uniqueByHour[`${table.Position}-${hour}`]) {
            // Ensure unique by position and hour
            uniqueByHour[`${table.Position}-${hour}`] = table;
          }
        });
        return Object.values(uniqueByHour);
      };

      // Get top 5 closest tables for each position without duplicate hours
      const topTables = Object.values(groupedByPosition).flatMap(
        (tables: any) => {
          const uniqueTables = removeDuplicateHours(tables);
          return uniqueTables
            .sort(
              (a: any, b: any) =>
                Math.abs(
                  new Date(a.DateTime).getTime() - targetDate.getTime()
                ) -
                Math.abs(new Date(b.DateTime).getTime() - targetDate.getTime())
            )
            .slice(0, 5); // Limit to 5 tables
        }
      );

      return topTables;
    };

    // Get top 5 tables for each position and day (current day and next day)
    const top5ForCurrentDay = getTop5ClosestTables(
      filteredTables.filter(
        (table) =>
          new Date(table.DateTime).toDateString() ===
          selectedDateTime.toDateString()
      ),
      selectedDateTime
    );

    const top5ForNextDay = getTop5ClosestTables(
      filteredTables.filter(
        (table) =>
          new Date(table.DateTime).toDateString() ===
          nextDayDateTime.toDateString()
      ),
      nextDayDateTime
    );

    // Combine results
    const combinedTopTables = [...top5ForCurrentDay, ...top5ForNextDay];

    // Sort the combined tables by position, then by hour, and finally by datetime
    combinedTopTables.sort((a, b) => {
      if (a.Position !== b.Position)
        return a.Position.localeCompare(b.Position);
      if (a.DateTime.split(" ")[1] !== b.DateTime.split(" ")[1])
        return a.DateTime.split(" ")[1].localeCompare(b.DateTime.split(" ")[1]);
      return new Date(a.DateTime).getTime() - new Date(b.DateTime).getTime();
    });

    setLikeWantedTables(combinedTopTables); // Update state with the filtered like tables
    console.log(
      "Filtered Like Tables (Limited to 5 per position and day, no duplicate hours): ",
      combinedTopTables
    ); // Debug log to check filtered tables
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
    getAllTables();
    getTablesPositions();
  }, [restId]);

  return (
    <ReservationContext.Provider
      value={{
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
        getLikeTables,
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
