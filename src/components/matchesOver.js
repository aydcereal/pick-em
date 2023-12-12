import TeamNameMapping from "../components/TeamNameMapping";

const matchesOver = (week) => {
  return new Promise((resolve, reject) => {
    const API_ENDPOINT_URL = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?seasontype=2&week=${week}&dates=2023`;
    const today = new Date();
    fetch(API_ENDPOINT_URL)
      .then((response) => response.json())
      .then((data) => {
        if (!data || !Array.isArray(data.events)) {
          console.error("Data structure is not as expected");
          return;
        }

        const events = data.events || [];

        console.log(events);

        const allGamesAreCompleted = events.every((event) => {
          const status = event.status.type;

          return status && status.completed;
        });

        resolve(allGamesAreCompleted);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        reject(error);
      });
  });
};

export default matchesOver;
