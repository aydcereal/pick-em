export const parseDate = (dateString) => {
  console.log("Raw dateString:", dateString);

  if (!dateString) {
    throw new Error("Invalid date string");
  }

  // First, split the string by commas
  const parts = dateString.split(",").map((str) => str.trim());

  // Check if the split parts are what we expect
  if (parts.length < 2) {
    throw new Error("Date string does not have the expected format");
  }

  // Extract the month, day, and time with timezone from the second part
  const monthDayAndTime = parts[1].split(" ").filter(Boolean);

  // The month and day should be the first two elements
  const month = monthDayAndTime[0];
  const day = monthDayAndTime[1];

  // The time should be the last two elements before the timezone (if present)
  const time = monthDayAndTime.slice(2, 4).join(" ");

  // Split time and period (AM/PM)
  const [timeString, period] = time.split(" ");

  // Create a new Date object for the current year
  const date = new Date();

  // Set the month and day
  date.setMonth(new Date(`${month} 1`).getMonth());
  date.setDate(parseInt(day));

  // Set the hours and minutes, adjusting for AM/PM
  let [hours, minutes] = timeString.split(":").map(Number);
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  date.setHours(hours, minutes, 0, 0);

  console.log("Parsed Date:", date);

  return date;
};

const cutOffDates = (week) => {
  console.log(week);
  return new Promise((resolve, reject) => {
    const API_ENDPOINT_URL = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?seasontype=2&week=${week}&dates=2024`;

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    fetch(API_ENDPOINT_URL)
      .then((response) => response.json())
      .then((data) => {
        if (!data || !Array.isArray(data.events)) {
          console.error("Data structure is not as expected");
          return;
        }

        const dateCounts = {};

        const events = data.events || [];

        events.forEach((event) => {
          try {
            if (!event || !Array.isArray(event.competitions)) {
              console.error("Event structure is not as expected");
              return;
            }

            const day = new Date(event.date);

            if (dateCounts.hasOwnProperty(day)) {
              dateCounts[day]++;
            } else {
              dateCounts[day] = 1;
            }
          } catch (error) {
            console.error("Error processing event:", error);
            reject(error);
          }
        });

        const dateKeys = Object.keys(dateCounts);
        let earliestDate = new Date(dateKeys[0]);
        let earliestSunday = new Date(
          dateKeys.find((key) => new Date(key).getDay() === 0)
        );

        dateKeys.forEach((key) => {
          const currentDate = new Date(key);
          const dayOfWeek = currentDate.getDay();

          if (currentDate < earliestDate) {
            earliestDate = currentDate;
          }

          if (dayOfWeek === 0 && currentDate < new Date(earliestSunday)) {
            earliestSunday = currentDate;
          }
        });

        const dateArray = [earliestDate, earliestSunday];

        let deadlines = [];

        dateArray.forEach((date, index) => {
          const dayOfWeek = daysOfWeek[date.getDay()];
          const month = months[date.getMonth()];
          const dayNumber = date.getDate();
          const time = date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
            timeZone: "America/Los_Angeles",
          });

          const fullDate = `${dayOfWeek}, ${month} ${dayNumber} ${time} PT`;

          deadlines.push(fullDate);
        });

        resolve(deadlines);
      });
  });
};

export default cutOffDates;
