// Utility functions
export const getDayName = (date: Date) =>
  date.toLocaleString("en-GB", { weekday: "long" });

export const getFormattedDate = (date: Date) => {
  const hours = date.getHours();

  // If the time is past 23:00, move to the next day
  if (hours >= 23) {
    date.setDate(date.getDate() + 1);
  }

  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
};

export const getFormattedTime = (date: Date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  // If the time is past 23:00 or between 00:00 and 07:59, set time to 08:00
  if (hours >= 23 || (hours >= 0 && hours < 8)) {
    return "08:00";
  }

  // Always round up to the nearest half-hour
  if (minutes > 0 && minutes <= 30) {
    minutes = 30;
  } else {
    minutes = 0;
    hours += 1;
  }

  // Handle 24-hour wrap-around
  if (hours === 24) {
    hours = 0;
  }

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};

export function calculateTimeSlots(searchedTime: string): string[] {
  const [hours, minutes] = searchedTime.split(":").map(Number);

  const createDateTime = (h: number, m: number) =>
    new Date().setHours(h, m, 0, 0);

  const searchedDateTime = createDateTime(hours, minutes);
  const beforeTime = new Date(searchedDateTime).setMinutes(minutes - 30);
  const afterTime = new Date(searchedDateTime).setMinutes(minutes + 30);

  return [
    new Date(beforeTime).toTimeString().slice(0, 5),
    searchedTime,
    new Date(afterTime).toTimeString().slice(0, 5),
  ];
}

export const formatDate = (date: Date) => {
  const dayName = date.toLocaleDateString("en-GB", { weekday: "long" });
  const dayNumber = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
  });

  return { dayName, dayNumber };
};

export function getAvailableHours(dateDayNumber: string | null) {
  // Generate time options based on selected date
  const times: string[] = [];
  const now = new Date();

  const isToday =
    dateDayNumber ===
    now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
    });

  let startHour = 8;
  let startMinute = 0;

  if (isToday && now.getHours() >= 8) {
    // Start time should be one hour ahead of the current time
    const nextAvailableTime = new Date(now.getTime() + 60 * 60 * 1000);
    startHour = nextAvailableTime.getHours();
    startMinute = nextAvailableTime.getMinutes() < 30 ? 30 : 0;
  }

  for (let hour = startHour; hour <= 23; hour++) {
    for (let minute = startMinute; minute < 60; minute += 30) {
      times.push(
        `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`
      );
    }
    startMinute = 0; // Reset startMinute after the first hour
  }

  return times;
}

export function generate30Days() {
  const today = new Date();
  const dates: Date[] = [];

  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    dates.push(date);
  }
  return dates;
}
export function getHourFromString(dateString: string): string {
  const date = new Date(dateString); // Convert the string to a Date object
  const hours = date.getHours(); // Get the hours part
  return hours.toString().padStart(2, "0"); // Convert the hour to a string and pad with a leading zero if necessary
}

export const formatNowToCustomDateTime = () => {
  const now = new Date();

  // Use getFormattedDate to format the date part (DD/MM)
  const formattedDate = getFormattedDate(now); // "DD/MM"

  // Replace '/' with '-' for your specific format
  const formattedDateWithDashes = formattedDate.replace(/\//g, "-");

  // Use getFormattedTime to format the time part (HH:MM)
  const formattedTime = getFormattedTime(now); // "HH:MM"

  // Combine date and time to "DD-MM-YYYYTHH:MM"
  return `2024-${formattedDateWithDashes}T${formattedTime}`;
};

// Example usage

export function generate30DaysAsStrings(): string[] {
  const today = new Date();
  const dates: string[] = [];

  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);

    // Get the short day name
    const dayName = date.toLocaleDateString("en-GB", { weekday: "short" });

    // Get the date in dd/mm format
    const dayMonth = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
    });

    dates.push(`${dayName} ${dayMonth}`);
  }

  return dates;
}

export const formatTo24HourClock = (dateTime: string): string => {
  const timePart = dateTime.split(" ")[1]; // Extract the time part from the dateTime string
  if (!timePart) return ""; // Return empty string if no time part is found

  const [hours, minutes] = timePart.split(":"); // Split the time into hours and minutes
  const formattedHour = parseInt(hours).toString().padStart(2, "0"); // Format hours with leading zero if needed
  const formattedMinutes = minutes.padStart(2, "0"); // Ensure minutes have two digits

  return `${formattedHour}:${formattedMinutes}`; // Return formatted time in "HH:MM" format
};

export function formatDateToYYYYMMDD(dateStr: string | undefined): string {
  if (!dateStr) return "";
  const [_, datePart] = dateStr.split(", ");
  if (!datePart) return "";
  const [day, month] = datePart.split("/").map(Number);
  const year = 2024;
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
    2,
    "0"
  )}`;
}

export function generateNext7Days(): string[] {
  const days = [];
  const options = {
    weekday: "short",
    month: "numeric",
    day: "numeric",
  } as const;
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    days.push(date.toLocaleDateString("en-GB", options));
  }
  return days;
}
