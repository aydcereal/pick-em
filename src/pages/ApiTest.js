import React, { useState, useEffect } from 'react';
import teamNameMapping from '../components/TeamNameMapping';
import classes from './apiTest.css'

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
              const team1 = teamNameMapping[competitors[1].team.abbreviation] || competitors[1].team.abbreviation;
              const team2 = teamNameMapping[competitors[0].team.abbreviation] || competitors[0].team.abbreviation;
              const record1 = competitors[1].records[0].summary;
              const record2 = competitors[0].records[0].summary;

              matchData.push({ team1, record1, team2, record2} );
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
    <div className='container'>
      <div className='col-md-7'>
        <form>
      <h1>NFL Match Schedule</h1>

      <table border='0' cellPadding='0' cellSpacing='0' style={{ width: '100%' }} id='picksheetTable'>
        <tbody>
          <tr>
            <td>
            <div className="row">
              <div className="col-6 text-center col-label">Away</div>
              <div className="col-6 text-center col-label">Home</div>
             </div>
            </td>
          </tr>
          {matches.map((match, index) =>(
          <tr>
              <td>
              
                <div key={index} id={`${match.team1}`} className="awayBox">
                  <table cellSpacing='0' cellPadding='0'>
                    <tbody>
                      <tr>
                        <td style={{ display: 'none' }}>
                          <input></input>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  
                  {match.team1}{match.record1}
                  
                  </div>
                <div key={index} id={`${match.team2}`} className="homeBox">{match.team2}{match.record2}</div>
              
              </td>
            </tr>
            ))}

        </tbody>
      </table>


      <ul>
        {matches.map((match, index) => (
          <li key={index}>
            {match.team1}{match.record1} vs {match.team2}{match.record2}
          </li>
        ))}
      </ul>
      </form>
      </div>
    </div>
  );
}
export default ApiTest;