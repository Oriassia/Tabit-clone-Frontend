import { ICurrentInitial } from "@/components/custom/ReservationForms/ReservationData";
import { useReservation } from "@/context/ReservationContext";

export const useGetLikeTables = () => {
  const { setLikeWantedTables, allTables } = useReservation();

  const getLikeTables = (
    currentInitials: ICurrentInitial,
    stringDate: string
  ) => {
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
    // console.log("getliketables stringdate: " + stringDate);

    const datePart = stringDate.split(", ")[1];
    // console.log("getliketables datepart: " + datePart);
    const [day, month] = datePart.split("/").map(Number); // Corrected to use dd/mm format
    // console.log("getliketables currentinitial: " + currentInitials.dateTime);
    let [hours, minutes] = currentInitials.dateTime
      .toString()
      .split("T")[1]
      .split(":");
    let hoursInt = parseInt(hours);
    let minutesInt = parseInt(minutes);

    // Construct selectedDateTime and nextDayDateTime
    const selectedDateTime = new Date(
      2024,
      month - 1,
      day,
      hoursInt,
      minutesInt
    ); // Manually set year to 2024

    const nextDayDateTime = new Date(
      2024,
      month - 1,
      day + 1,
      hoursInt,
      minutesInt
    ); // Manually add 1 day
    // Convert selectedGuests to a number for comparison
    const guestsCount = parseInt(currentInitials.guests, 10);

    // 1.5 hours window in milliseconds
    const timeWindowMs = 1.5 * 3600000;

    // Helper function to format DateTime consistently
    const formatDateTime = (dateTime: string | Date) => {
      // If `dateTime` is already a Date object, convert it to the correct format
      if (dateTime instanceof Date) {
        const year = dateTime.getFullYear();
        const month = String(dateTime.getMonth() + 1).padStart(2, "0"); // Month is zero-based
        const day = String(dateTime.getDate()).padStart(2, "0");
        const hours = String(dateTime.getHours()).padStart(2, "0");
        const minutes = String(dateTime.getMinutes()).padStart(2, "0");
        dateTime = `${day}-${month}-${year}T${hours}:${minutes}`;
      }

      // Now we can safely split the dateTime string
      const [datePart, timePart] = dateTime.split("T");

      const [day, month, year] = datePart.split("-").map(Number);

      const [hours, minutes] = timePart.split(":").map(Number);

      return new Date(year, month - 1, day, hours, minutes);
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

      const tableHour = tableDateTime.getHours().toString(); // Extract hour:minute from ISO format
      const selectedHour = selectedDateTime.getHours().toString(); // Same for selectedDateTime

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
