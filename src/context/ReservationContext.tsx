import React, { createContext, useContext, useState, useEffect } from "react";
import { IRestaurant } from "@/types/restaurant";
import api from "@/services/api.services";
import { useSearchParams } from "react-router-dom";

// Define types for context state
interface ReservationContextType {
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
  tableId: string | null;
  setTableId: (id: string | null) => void;
  likeWantedTables: any[];
  setLikeWantedTables: (tables: any[]) => void;
  allTables: any[];
  positions: any[];
  getLikeTables: () => void;
  getAllTables: () => void;
  getTablesPositions: () => void;
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
  const [tableId, setTableId] = useState<string | null>(null);
  const [likeWantedTables, setLikeWantedTables] = useState<any[]>([]);
  const [allTables, setAllTables] = useState<any[]>([]); // State for all tables
  const [positions, setPositions] = useState<any[]>([]); // State for table positions
  const [searchParams] = useSearchParams();
  const restId = searchParams.get("restid");

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

  // Function to format date and time
  const formatToDateTime = (datePart: string, timePart: string): string => {
    const targetYear = 2024;
    const [_, dateString] = datePart.split(", ").map((part) => part.trim());
    const [month, day] = dateString.split("/").map(Number);
    const [time] = timePart.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    const formattedDate = new Date(targetYear, month - 1, day, hours, minutes);
    const formattedString = `${formattedDate.getFullYear()}-${(
      formattedDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${formattedDate
      .getDate()
      .toString()
      .padStart(2, "0")} ${formattedDate
      .getHours()
      .toString()
      .padStart(2, "0")}:${formattedDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    return formattedString;
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
    const [dayOfWeek, datePart] = selectedDate.split(", ");
    const [month, day] = datePart.split("/").map(Number);
    const [hours, minutes] = selectedHour.split(":").map(Number);

    const selectedDateTime = new Date(2024, month - 1, day, hours, minutes); // Manually set year to 2024
    const nextDayDateTime = new Date(selectedDateTime.getTime() + 86400000); // Add 1 day (in milliseconds)

    // Convert selectedGuests to a number for comparison
    const guestsCount = parseInt(selectedGuests, 10);

    // 2.5 hours window in milliseconds
    const timeWindowMs = 2.5 * 3600000;

    // Filter likeWantedTables based on criteria
    const filteredTables = allTables.filter((table) => {
      const tableDateTime = new Date(table.DateTime);
      const timeDifference = Math.abs(
        selectedDateTime.getTime() - tableDateTime.getTime()
      );
      const isSameDate =
        tableDateTime.toDateString() === selectedDateTime.toDateString();
      const isNextDay =
        tableDateTime.toDateString() === nextDayDateTime.toDateString();
      const isCapacitySufficient = parseInt(table.Capacity, 10) >= guestsCount; // Check capacity

      // Rule 1: Same Date and Time, Different Position, and Capacity is sufficient
      if (
        isSameDate &&
        selectedHour === table.DateTime.split(" ")[1] &&
        table.Position !== selectedPosition &&
        isCapacitySufficient
      ) {
        return true;
      }

      // Rule 2: Same Date, Close Time (within 2.5 hours), Same Position, and Capacity is sufficient
      if (
        isSameDate &&
        timeDifference <= timeWindowMs &&
        table.Position === selectedPosition &&
        isCapacitySufficient
      ) {
        return true;
      }

      // Rule 3: Same Date, Close Time (within 2.5 hours), Different Position, and Capacity is sufficient
      if (
        isSameDate &&
        timeDifference <= timeWindowMs &&
        table.Position !== selectedPosition &&
        isCapacitySufficient
      ) {
        return true;
      }

      // Rule 4: Next Day, Same Time, Same Position, and Capacity is sufficient
      if (
        isNextDay &&
        selectedHour === table.DateTime.split(" ")[1] &&
        table.Position === selectedPosition &&
        isCapacitySufficient
      ) {
        return true;
      }

      // Rule 5: Next Day, Close Time (within 2.5 hours), All Positions, and Capacity is sufficient
      if (isNextDay && timeDifference <= timeWindowMs && isCapacitySufficient) {
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

    setLikeWantedTables(combinedTopTables); // Update state with the filtered like tables
    console.log(
      "Filtered Like Tables (Limited to 5 per position and day, no duplicate hours): ",
      combinedTopTables
    ); // Debug log to check filtered tables
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
