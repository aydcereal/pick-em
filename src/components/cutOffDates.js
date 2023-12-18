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

        console.log(events);

        events.forEach((event) => {
          try {
            if (!event || !Array.isArray(event.competitions)) {
              console.error("Event structure is not as expected");
              return;
            }

            const day = new Date(event.date);

            const dayOfWeek = daysOfWeek[day.getDay()];
            const month = months[day.getMonth()];
            const dayNumber = day.getDate();
            const time = day.toLocaleTimeString("en-US", {
              timeZone: "America/Los_Angeles",
            });
            const year = day.getFullYear();

            const fullDate = `${dayOfWeek}, ${month} ${dayNumber} ${year} ${time}`;

            console.log(fullDate);

            if (dateCounts.hasOwnProperty(fullDate)) {
              dateCounts[fullDate]++;
            } else {
              dateCounts[fullDate] = 1;
            }
          } catch (error) {
            console.error("Error processing event:", error);
            reject(error);
          }
        });

        const dateKeys = Object.keys(dateCounts);
        let earliestDate = new Date(Date.parse(dateKeys[0]));
        let earliestSunday = dateKeys.find(
          (key) => new Date(key).getDay() === 0
        );

        dateKeys.forEach((key) => {
          const currentDate = new Date(Date.parse(key));
          const dayOfWeek = currentDate.getDay();

          if (currentDate < earliestDate) {
            earliestDate = currentDate;
          }

          if (dayOfWeek === 0 && currentDate < new Date(earliestSunday)) {
            earliestSunday = key;
          }
        });

        console.log("Earliest Thursday", earliestDate);
        console.log("earliest Sunday", earliestSunday);

        resolve(dateCounts);
      });
  });
};

export default cutOffDates;
