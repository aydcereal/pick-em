import React, { useState, useEffect } from 'react';

function ApiTest() {
  const [teamNicknames, setTeamNicknames] = useState([]);

  useEffect(() => {
    fetch('https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?seasontype=2&week=1&dates=2023')
      .then(response => response.json())
      .then(data => {
        console.log(data.events[0].competitions[0].competitors[0].team.location);
        const competition = data.events[0].competitions[0];
        const teamNicknames = competition.competitors.map(competitor => competitor.team.location);
        setTeamNicknames(teamNicknames);
      });
  }, []);

  return (
    <div>
      <h1>Team Nicknames</h1>
      <ul>
        {teamNicknames.map(nickname => (
          <li key={nickname}>{nickname}</li>
        ))}
      </ul>
    </div>
  );
}

export default ApiTest;