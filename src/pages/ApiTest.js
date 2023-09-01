import React, { useState, useEffect } from 'react';
import teamNameMapping from '../components/TeamNameMapping';
import classes from './apiTest.css'
import logo from '../images/team logos/1.png'

const getTeamLogo = teamId => {
  return import(`../images/team logos/${teamId}.png`)
    .then(module => module.default)
    .catch(error => {
      console.error(`Error importing image for team ${teamId}:`, error);
      return null;
    });
};



const ApiTest = () => {
  const [matches, setMatches] = useState([]);
  const [teamLogos, setTeamLogos] = useState({});

  useEffect(() => {
    matches.forEach(match => {
      getTeamLogo(match.team1Id).then(logo => {
        setTeamLogos(logos => ({ ...logos, [match.team1Id]: logo }));
      });
      getTeamLogo(match.team2Id).then(logo => {
        setTeamLogos(logos => ({ ...logos, [match.team2Id]: logo }));
      });
    });
  }, [matches]);

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
                const team1Abbr = competitors[1].team.abbreviation;
                const team2Abbr = competitors[0].team.abbreviation;
        
                const team1Info = teamNameMapping[team1Abbr] || { name: team1Abbr, id: -1 };
                const team2Info = teamNameMapping[team2Abbr] || { name: team2Abbr, id: -1 };
        
                const team1 = team1Info.name;
                const team2 = team2Info.name;
                const record1 = competitors[1].records[0].summary;
                const record2 = competitors[0].records[0].summary;
                const team1Id = team1Info.id;
                const team2Id = team2Info.id;
        
                matchData.push({ team1, record1, team1Id, team2, record2,team2Id });
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
              
                <div key={match.team1Id} id={"box"+`${match.team1Id}`} className="awayBox">
                  <table cellSpacing='0' cellPadding='0'>
                    <tbody>
                      <tr>
                        <td style={{ display: 'none' }}>
                          <input></input>
                        </td>
                        <td>
                        <img className='h' src={teamLogos[match.team1Id]} alt={`${match.team1} Logo`} />
                        
                          
                        </td>
                        <td>
                          <span className="teamName">{match.team1}</span>
                          <span className="teamAbbr"></span>
                          <span className="teamRecord">{match.record1}</span>
                          <span className="teamLocation">Away</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  
                  
                  
                  </div>
                <div key={match.team2Id} id={"box"+`${match.team2Id}`} className="homeBox">
                <table cellSpacing='0' cellPadding='0'>
                    <tbody>
                      <tr>
                        <td style={{ display: 'none' }}>
                          <input></input>
                        </td>
                        <td>
                        <img className='h' src={teamLogos[match.team2Id]} alt={`${match.team2} Logo`} />
                          
                          
                        </td>
                        <td>
                          <span className="teamName">{match.team2}</span>
                          <span className="teamAbbr"></span>
                          <span className="teamRecord">{match.record2}</span>
                          <span className="teamLocation">Home</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  </div>
              
              </td>
            </tr>
            ))}

        </tbody>
      </table>


    
      </form>
      </div>
    </div>
  );
}
export default ApiTest;