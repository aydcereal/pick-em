import React, { useState, useEffect } from 'react';

const ApiTest = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const API_ENDPOINT_URL = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?seasontype=2&week=1&dates=2023";

    fetch(API_ENDPOINT_URL)
      .then(response => response.json())
      .then(data => {
        const events = data.events || [];

        const matchData = [];

        events.forEach(event => {
          const competitions = event.competitions || [];

          competitions.forEach(competition => {
            const competitors = competition.competitors;
            if (competitors.length === 2) {
              const team1 = competitors[0].team.location;
              const team2 = competitors[1].team.location;
              matchData.push({ team1, team2 });
            }
          });
        });

        setMatches(matchData);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1>NFL Match Schedule</h1>
      <ul>
        {matches.map((match, index) => (
          <li key={index}>
            {match.team1} vs {match.team2}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApiTest;