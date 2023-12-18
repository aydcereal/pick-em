const MatchDates = (week) => {
  return new Promise((resolve, reject) => {
    const API_ENDPOINT_URL = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?seasontype=2&week=${week}&dates=2023`;

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
            const date = day.toLocaleDateString();

            if (dateCounts.hasOwnProperty(date)) {
              dateCounts[date]++;
            } else {
              dateCounts[date] = 1;
            }
          } catch (error) {
            console.error("Error processing event:", error);
            reject(error);
          }
        });

        resolve(dateCounts);
      });
  });
};

export default MatchDates;
