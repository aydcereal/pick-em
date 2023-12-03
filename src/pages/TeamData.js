import TeamNameMapping from "../components/TeamNameMapping";

const TeamData = (week) => {
  return new Promise((resolve, reject) => {
    const API_ENDPOINT_URL = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?seasontype=2&week=${week}&dates=2023`;

    fetch(API_ENDPOINT_URL)
      .then((response) => response.json())
      .then((data) => {
        if (!data || !Array.isArray(data.events)) {
          console.error("Data structure is not as expected");
          return;
        }

        const matches = [];
        let scores = 0;

        const events = data.events || [];

        const lastMatchIndex = events.length - 1;

        const mondayMatchDate = new Date(
          events[lastMatchIndex].date
        ).toLocaleDateString();

        const matchesOnMonday = events.filter((item) => {
          // Convert item date to a common format without time
          const itemDateWithoutTime = new Date(item.date).toLocaleDateString();

          // Compare the two formatted dates
          return itemDateWithoutTime === mondayMatchDate;
        });

        console.log(matchesOnMonday);

        const mondayScores = () => {
          matchesOnMonday.map((item) => {
            const score1 = Number(item.competitions[0].competitors[0].score);
            const score2 = Number(item.competitions[0].competitors[1].score);

            scores += score1 + score2;
          });
        };

        mondayScores();

        const results = events.flatMap((event) =>
          event.competitions.flatMap((competition) =>
            competition.competitors.map((competitor) => ({
              id: competitor.id,
              winner: competitor.winner,
            }))
          )
        );

        events.forEach((event) => {
          try {
            if (!event || !Array.isArray(event.competitions)) {
              console.error("Event structure is not as expected");
              return;
            }

            const competitions = event.competitions || [];

            competitions.forEach((competition) => {
              const competitors = competition.competitors;

              if (competitors.length === 2) {
                const team1Abbr = competitors[1].team.abbreviation;
                const team2Abbr = competitors[0].team.abbreviation;

                const team1Info = TeamNameMapping[team1Abbr] || {
                  name: team1Abbr,
                  id: -1,
                };
                const team2Info = TeamNameMapping[team2Abbr] || {
                  name: team2Abbr,
                  id: -1,
                };

                const date = new Date(event.date);

                const team1Id = team1Info.id;
                const team2Id = team2Info.id;

                const match = {
                  team1Id,
                  team2Id,
                  date,
                  team1Abbr,
                  team2Abbr,
                };

                const itemExists = matches.some(
                  (item) =>
                    item.team1Id === team1Id &&
                    item.team2Id === team2Id &&
                    item.date === date
                );

                if (!itemExists) {
                  matches.push(match);
                }
              }
            });
          } catch (error) {
            console.error("Error processing event:", error);
            reject(error);
          }
        });

        matches.sort((a, b) => a.date - b.date);

        const combinedResults = {
          matches: matches,
          results: results,
          mondayScores: scores,
        };

        resolve(combinedResults);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });
};

export default TeamData;
