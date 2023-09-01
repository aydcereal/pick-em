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

function EventList({events}){

  function groupEventsByDate(events) {
    return events.reduce((result, event) => {
      const date = event.dateString; 
      if (!result[date]) {
        result[date] = [];
      }
      result[date].push(event);
      return result;
    }, {});
  }
  
  function sortDates(dates) {
    return dates.sort((a, b) => new Date(a) - new Date(b));
  }

  const groupedEvents = groupEventsByDate(events);

  // Step 2: Get unique and sorted dates
  const eventDates = sortDates(Object.keys(groupedEvents));

}





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
                
                const date = new Date(event.date)
                const fullDate = event.date

                const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

                const dayOfWeek = daysOfWeek[date.getUTCDay()];
                const month = months[date.getUTCMonth()];
                const day = date.getUTCDate();

                const dateString = `${dayOfWeek}, ${month}, ${day}`

                matchData.sort((a, b) => {
                  const dateA = new Date(a.fullDate);
                  const dateB = new Date(b.fullDate);
                  return dateA - dateB;
                });

                const groupedData = {};
                matchData.forEach((match) => {
                  const date = match.fullDate.split('T')[0];
                  if (!groupedData[date]) {
                    groupedData[date] = [];
                  }
                  groupedData[date].push(match);
                });

                for (const date in groupedData) {
                  console.log(`Date: ${date}`);
                  groupedData[date].forEach((match) => {
                    console.log(`  ${match.team1} vs ${match.team2}`);
                  });
                }
               
                
        
                const team1Info = teamNameMapping[team1Abbr] || { name: team1Abbr, id: -1 };
                const team2Info = teamNameMapping[team2Abbr] || { name: team2Abbr, id: -1 };
        
                const team1 = team1Info.name;
                const team2 = team2Info.name;
                const record1 = competitors[1].records[0].summary;
                const record2 = competitors[0].records[0].summary;
                const team1Id = team1Info.id;
                const team2Id = team2Info.id;
        
                matchData.push({ team1, record1, team1Id, team2, record2,team2Id, dateString,fullDate });
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
                          <span className="teamRecord">({match.dateString})</span>
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
                          <span className="teamRecord">({match.record2})</span>
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


      <EventList events={matches} />
      </form>
      </div>
    </div>
  );
}
export default ApiTest;