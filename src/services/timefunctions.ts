// Utility functions
export const getDayName = (date: Date) =>
  date.toLocaleString("en-US", { weekday: "long" });

export const getFormattedDate = (date: Date) => {
  const hours = date.getHours();

  // If the time is past 23:00, move to the next day
  if (hours >= 23) {
    date.setDate(date.getDate() + 1);
  }

  return `${date.getDate().toString().padStart(2, "0")} / ${(
    date.getMonth() + 1
  )
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
