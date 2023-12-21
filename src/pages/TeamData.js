import { TeamAbbrMapping } from "../components/TeamNameMapping";

const dataFetching = async (week) => {
  const API_ENDPOINT_URL = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?seasontype=2&week=${week}&dates=2023`;
  try {
    const response = await fetch(API_ENDPOINT_URL);
    console.log(response);
    const data = await response.json();
    if (!data || !Array.isArray(data.events)) {
      console.error("Data structure is not as expected");
      return;
    }

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const TeamData = (week) => {
  console.log("TeamData");
  return new Promise((resolve, reject) => {
    dataFetching(week)
      .then((data) => {
        console.log("Returned data:", data);
        if (!data || !Array.isArray(data.events)) {
          console.error("Data structure is not as expected");
          return;
        }

        console.log(data);

        const matches = [];
        let scores = 0;

        const events = data.events || [];

        events.sort((a, b) => new Date(a.date) - new Date(b.date));

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

                const team1Info = TeamAbbrMapping[team1Abbr] || {
                  name: team1Abbr,
                  id: -1,
                };
                const team2Info = TeamAbbrMapping[team2Abbr] || {
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

        console.log(combinedResults);
        resolve(combinedResults);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });
};

export const MatchData = (week) => {
  return new Promise((resolve, reject) => {
    const API_ENDPOINT_URL = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?seasontype=2&week=${week}&dates=2023`;

    dataFetching(API_ENDPOINT_URL)
      .then((data) => {
        if (!data || !Array.isArray(data.events)) {
          console.error("Data structure is not as expected");
          return;
        }
        const events = data.events || [];
        events.sort((a, b) => new Date(a.date) - new Date(b.date));

        const matches = [];

        events.forEach((event) => {
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

              const date = new Date(event.date);
              const dayOfWeek = daysOfWeek[date.getDay()];
              const month = months[date.getMonth()];
              const day = date.getDate();

              const dateString = `${dayOfWeek}, ${month}, ${day}`;

              const team1Info = TeamAbbrMapping[team1Abbr] || {
                name: team1Abbr,
                id: -1,
              };
              const team2Info = TeamAbbrMapping[team2Abbr] || {
                name: team2Abbr,
                id: -1,
              };

              const team1 = team1Info.name;
              const team2 = team2Info.name;
              const record1 = competitors[1].records[0].summary;
              const record2 = competitors[0].records[0].summary;
              const team1Id = team1Info.id;
              const team2Id = team2Info.id;

              const match = {
                team1,
                team2,
                record1,
                record2,
                team1Id,
                team2Id,
                dateString,
              };

              const itemExists = matches.some(
                (item) =>
                  team1 === item.team1 &&
                  team2 === item.team2 &&
                  record1 === item.record1 &&
                  record2 === item.record2 &&
                  team1Id === item.team1Id &&
                  team2Id === item.team2Id &&
                  dateString === item.dateString
              );

              if (!itemExists) {
                matches.push(match);
              }
            }
          });
        });
        console.log(matches);
        resolve(matches);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        reject(error);
      });
  });
};
