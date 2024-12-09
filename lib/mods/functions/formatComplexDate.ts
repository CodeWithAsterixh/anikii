export function parseAndFormatDates(concatenatedDates: string) {
  const chunkSize = 19; // Length of each datetime string
  const dates = [];

  // Split the concatenated string into individual date strings
  for (let i = 0; i < concatenatedDates.length; i += chunkSize) {
    const dateString = concatenatedDates.slice(i, i + chunkSize);
    const date = new Date(dateString);

    // Format the date into a readable format
    const formattedDate = date.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    dates.push(formattedDate);
  }

  return dates;
}
