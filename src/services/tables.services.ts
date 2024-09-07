import { ICurrentInitial } from "@/components/custom/ReservationForms/ReservationData";
import { useReservation } from "@/context/ReservationContext";

export const useGetLikeTables = () => {
  const { setLikeWantedTables, allTables } = useReservation();

  const getLikeTables = (
    currentInitials: ICurrentInitial,
    stringDate: string
  ) => {
    console.log("currentInitials: ", currentInitials);

    // Check if all fields are filled
    if (
      !currentInitials.dateTime ||
      !currentInitials.position ||
      !currentInitials.guests
    ) {
      console.error(
        "Incomplete selection criteria. Ensure date, time, position, and guests are selected."
      );
      return;
    }

    // Parse date and time from currentInitials
    const datePart = stringDate.split(", ")[1];
    const [day, month] = datePart.split("/").map(Number); // Corrected to use dd/mm format
    console.log(currentInitials.dateTime);

    let [hours, minutes] = currentInitials.dateTime
      .split(" ")[1]
      .split(":")
      .map(Number);
    if (isNaN(minutes) || isNaN(hours)) {
      [hours, minutes] = currentInitials.dateTime
        .split("T")[1]
        .split(":")
        .map(Number);
    }

    // Construct selectedDateTime and nextDayDateTime
    const selectedDateTime = new Date(2024, month - 1, day, hours, minutes); // Manually set year to 2024

    const nextDayDateTime = new Date(2024, month - 1, day + 1, hours, minutes); // Manually add 1 day
    // Convert selectedGuests to a number for comparison
    const guestsCount = parseInt(currentInitials.guests, 10);

    // 1.5 hours window in milliseconds
    const timeWindowMs = 1.5 * 3600000;

    // Helper function to format DateTime consistently
    const formatDateTime = (dateTime: string) => {
      if (dateTime.includes(" ")) {
        return new Date(dateTime.replace(" ", "T")); // Replace space with "T" for consistency
      }
      return new Date(dateTime);
    };

    // Filter likeWantedTables based on criteria
    const filteredTables = allTables.filter((table) => {
      const tableDateTime = formatDateTime(table.DateTime); // Convert table.DateTime to a Date object
      const tableDate = tableDateTime.toDateString(); // Get the date part as a string
      const tableTime = tableDateTime.getTime(); // Get time in milliseconds

      const selectedDateStr = selectedDateTime.toDateString(); // Get date part as a string
      const nextDayDateStr = nextDayDateTime.toDateString(); // Get next day date part as a string

      const timeDifference = Math.abs(selectedDateTime.getTime() - tableTime);
      const timeDifferenceNextDay = Math.abs(
        nextDayDateTime.getTime() - tableTime
      );

      const isSameDate = tableDate === selectedDateStr;
      const isNextDay = tableDate === nextDayDateStr;
      const isCapacitySufficient = parseInt(table.Capacity, 10) >= guestsCount; // Check capacity

      const tableHour = tableDateTime.toISOString().slice(11, 16); // Extract hour:minute from ISO format
      const selectedHour = selectedDateTime.toISOString().slice(11, 16); // Same for selectedDateTime

      // Rule 1: Same Date, Same Hour, Different Position, Capacity sufficient
      if (
        isSameDate &&
        tableHour === selectedHour &&
        table.Position !== currentInitials.position &&
        isCapacitySufficient
      ) {
        return true;
      }

      // Rule 2: Same Date, Within ±1.5 Hours, Same Position, Capacity sufficient
      if (
        isSameDate &&
        timeDifference <= timeWindowMs &&
        table.Position === currentInitials.position &&
        isCapacitySufficient
      ) {
        return true;
      }

      // Rule 3: Same Date, Within ±1.5 Hours, Different Position, Capacity sufficient
      if (
        isSameDate &&
        timeDifference <= timeWindowMs &&
        table.Position !== currentInitials.position &&
        isCapacitySufficient
      ) {
        return true;
      }

      // Rule 4: Next Day, Within ±1.5 Hours, Same Position, Capacity sufficient
      if (
        isNextDay &&
        timeDifferenceNextDay <= timeWindowMs &&
        table.Position === currentInitials.position &&
        isCapacitySufficient
      ) {
        return true;
      }

      // Rule 5: Next Day, Within ±1.5 Hours, Different Position, Capacity sufficient
      if (
        isNextDay &&
        timeDifferenceNextDay <= timeWindowMs &&
        table.Position !== currentInitials.position &&
        isCapacitySufficient
      ) {
        return true;
      }

      // Rule 6: Next Day, Same Hour, Same Position, Capacity sufficient
      if (
        isNextDay &&
        tableHour === selectedHour &&
        table.Position === currentInitials.position &&
        isCapacitySufficient
      ) {
        return true;
      }

      // Rule 7: Next Day, Same Hour, Different Position, Capacity sufficient
      if (
        isNextDay &&
        tableHour === selectedHour &&
        table.Position !== currentInitials.position &&
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
          const hour = formatDateTime(table.DateTime)
            .toISOString()
            .slice(11, 16); // Get the hour part of DateTime
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
                  formatDateTime(a.DateTime).getTime() - targetDate.getTime()
                ) -
                Math.abs(
                  formatDateTime(b.DateTime).getTime() - targetDate.getTime()
                )
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
          formatDateTime(table.DateTime).toDateString() ===
          selectedDateTime.toDateString()
      ),
      selectedDateTime
    );

    const top5ForNextDay = getTop5ClosestTables(
      filteredTables.filter(
        (table) =>
          formatDateTime(table.DateTime).toDateString() ===
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
      const timeA = formatDateTime(a.DateTime).toISOString().slice(11, 16);
      const timeB = formatDateTime(b.DateTime).toISOString().slice(11, 16);
      if (timeA !== timeB) {
        return timeA.localeCompare(timeB);
      }
      return (
        formatDateTime(a.DateTime).getTime() -
        formatDateTime(b.DateTime).getTime()
      );
    });

    setLikeWantedTables(combinedTopTables); // Update state with the filtered like tables
  };

  return getLikeTables;
};
