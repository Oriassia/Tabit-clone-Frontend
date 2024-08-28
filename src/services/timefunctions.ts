// Utility functions
export const getDayName = (date: Date) =>
  date.toLocaleString("en-US", { weekday: "long" });

export const getFormattedDate = (date: Date) =>
  `${date.getDate().toString().padStart(2, "0")} / ${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;

export const getFormattedTime = (date: Date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();

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
