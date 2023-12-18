const cutOffDates = (week) => {
  return new Promise((resolve, reject) => {
    const API_ENDPOINT_URL = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?seasontype=2&week=${week}&dates=2023`;

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
