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

        const dates = [];

        const events = data.events || [];

        events.forEach((event) => {
          try {
            if (!event || !Array.isArray(event.competitions)) {
              console.error("Event structure is not as expected");
              return;
            }

            const day = new Date(event.date).getDate();

            dates.push(day);

            console.log(event.date);
          } catch (error) {
            console.error("Error processing event:", error);
            reject(error);
          }
        });
        const uniqueDates = [...new Set(dates)];
        console.log(uniqueDates);
      });
  });
};

export default MatchDates;
