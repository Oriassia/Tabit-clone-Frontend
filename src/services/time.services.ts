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
  const [hours, minutes] = searchedTime?.split(":").map(Number);

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

  if (isToday && now.getHours() >= 8 && now.getHours() <= 23) {
    // Start time should be one hour ahead of the current time
    const nextAvailableTime = new Date(now.getTime() + 60 * 90 * 1000);
    startHour = nextAvailableTime.getHours();
    startMinute = nextAvailableTime.getMinutes() < 30 ? 30 : 0;
  } else {
    startHour = 8;
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
  const date = formatDateTime(dateString); // Convert the string to a Date object
  const hours = date.getHours(); // Get the hours part
  return hours.toString().padStart(2, "0"); // Convert the hour to a string and pad with a leading zero if necessary
}

// Adjusted formatDateTime function
export const formatDateTime = (dateTime: string | Date) => {
  // Helper function to detect and rearrange date format
  const convertToDDMMYYYY = (dateStr: string) => {
    // Check if the date is in YYYY-MM-DD format
    const yyyymmddRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
    if (yyyymmddRegex.test(dateStr)) {
      const [datePart, timePart] = dateStr.split("T");
      const [year, month, day] = datePart.split("-");
      return `${day}-${month}-${year}T${timePart}`; // Convert to DD-MM-YYYYTHH:MM:SS
    }
    return dateStr; // Return unchanged if already in DD-MM-YYYY format
  };

  // Convert string if needed
  if (typeof dateTime === "string") {
    if (dateTime.indexOf("T") == -1 && dateTime.indexOf(" ") != -1) {
      dateTime = dateTime.replace(" ", "T");
    }
    dateTime = convertToDDMMYYYY(dateTime);
  }

  if (dateTime instanceof Date) {
    // Convert the Date object to the format 'DD-MM-YYYYTHH:MM'
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, "0");
    const day = String(dateTime.getDate()).padStart(2, "0");
    const hours = String(dateTime.getHours()).padStart(2, "0");
    const minutes = String(dateTime.getMinutes()).padStart(2, "0");
    dateTime = `${day}-${month}-${year}T${hours}:${minutes}`;
  }

  const [datePart, timePart] = dateTime?.split("T");
  console.log(dateTime);

  const [day, month, year] = datePart?.split("-").map(Number); // Use the correct order here
  const [hours, minutes] = timePart?.split(":").map(Number);

  return new Date(year, month - 1, day, hours, minutes);
};

export const parseISOToDate = (isoString: string) => {
  if (
    typeof isoString === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(isoString)
  ) {
    return new Date(isoString);
  } else {
    console.error("Invalid ISO format:", isoString);
    return null; // Return null if the format is invalid
  }
};

export const formatNowToCustomDateTime = () => {
  const now = new Date();

  // Use getFormattedDate to format the date part (DD/MM)
  const formattedDate = getFormattedDate(now); // "DD/MM"

  // Replace '/' with '-' for your specific format
  const formattedDateWithDashes = formattedDate.replace(/\//g, "-");

  // Use getFormattedTime to format the time part (HH:MM)
  const formattedTime = getFormattedTime(now); // "HH:MM"

  // Combine date and time to "DD-MM-YYYYTHH:MM"
  return `${formattedDateWithDashes}-2024T${formattedTime}`;
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

export const formatTo24HourClock = (
  dateTime: string | Date | undefined
): string => {
  if (!dateTime) {
    console.error("Error: dateTime is undefined or null");
    return "";
  }

  if (dateTime instanceof Date) {
    const hours = String(dateTime.getHours()).padStart(2, "0");
    const minutes = String(dateTime.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  } else if (typeof dateTime === "string") {
    if (!dateTime.includes("T")) {
      console.error("Error: dateTime string does not contain 'T' separator");
      return "";
    }

    const timePart = dateTime?.split("T")[1];

    if (!timePart) {
      console.error(
        "Error: Time part is undefined or null after splitting by 'T'"
      );
      return "";
    }

    const [hours, minutes] = timePart?.split(":");
    if (!hours || !minutes) {
      console.error("Error: Invalid time format in dateTime string");
      return "";
    }

    const formattedHour = parseInt(hours).toString().padStart(2, "0");
    const formattedMinutes = minutes.padStart(2, "0");

    return `${formattedHour}:${formattedMinutes}`;
  }

  console.error("Error: dateTime is not a recognized type");
  return "";
};

export function formatDateToYYYYMMDD(dateStr: string | undefined): string {
  if (!dateStr) return "";

  const [_, datePart] = dateStr?.split(", ");
  if (!datePart) return "";
  const [day, month] = datePart?.split("/").map(Number);
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
export function formatDateString(input: string) {
  const [day, month] = input?.split("/");

  // Convert to numbers to remove leading zeros, then join them with ' / '
  const formattedDate = `${parseInt(day)} / ${parseInt(month)}`;

  return formattedDate;
}

export function computeDayName(dateStr: string) {
  try {
    const date = formatDateTime(dateStr);
    console.log("date:: " + date);

    return new Intl.DateTimeFormat("en-GB", { weekday: "short" }).format(date);
  } catch (error) {
    return null;
  }
}

export function computeDateNumber(dateStr: string) {
  try {
    const date = formatDateTime(dateStr);
    const dayNumber = date.getDate().toString().padStart(2, "0");
    const monthNumber = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    return `${dayNumber}/${monthNumber}`;
  } catch (error) {
    return null;
  }
}

export function computeTime(dateStr: string) {
  try {
    const date = formatDateTime(dateStr);
    return date.toTimeString().substring(0, 5);
  } catch (error) {
    return null;
  }
}
