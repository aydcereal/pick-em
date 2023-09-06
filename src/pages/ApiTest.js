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
  let itemCounter = 1;
  

  useEffect(() => {

    matches.forEach(date => {
      date.items.forEach(match => {
        getTeamLogo(match.team1Id).then(logo => {
          setTeamLogos(logos => ({ ...logos, [match.team1Id]: logo }));
        });
        getTeamLogo(match.team2Id).then(logo => {
          setTeamLogos(logos => ({ ...logos, [match.team2Id]: logo }));
        });
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


                const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

                const dayOfWeek = daysOfWeek[date.getDay()];
                
                const month = months[date.getMonth()];
                const day = date.getDate();

                const dateString = `${dayOfWeek}, ${month}, ${day}`
                

        
                const team1Info = teamNameMapping[team1Abbr] || { name: team1Abbr, id: -1 };
                const team2Info = teamNameMapping[team2Abbr] || { name: team2Abbr, id: -1 };
        
                const team1 = team1Info.name;
                const team2 = team2Info.name;
                const record1 = competitors[1].records[0].summary;
                const record2 = competitors[0].records[0].summary;
                const team1Id = team1Info.id;
                const team2Id = team2Info.id;
        
                matchData.push({ team1, record1, team1Id, team2, record2,team2Id, dateString });
            }
          });

        });

        

        const customDateSort = (a, b) => {
          // Convert date strings to JavaScript Date objects
          const dateA = new Date(a.dateString.replace(/,/g, ''));
          const dateB = new Date(b.dateString.replace(/,/g, ''));
        
          // Compare the Date objects
          if (dateA < dateB) return -1;
          if (dateA > dateB) return 1;
          return 0;
        };
        matchData.sort(customDateSort); // Sort the array by date
        console.log(matchData); // Display the sorted matchData array

        const groupedData = matchData.reduce((result, item) => {
          const dateString = item.dateString;
          
          // If there's no array for this dateString in the result object, create one
          if (!result[dateString]) {
            result[dateString] = [];
          }
          
          // Push the current item into the array for this dateString
          result[dateString].push(item);
          
          return result;
        }, {});
        
        // Convert the groupedData object back to an array of objects
        const groupedArray = Object.keys(groupedData).map(dateString => ({
          dateString: dateString,
          items: groupedData[dateString]
        }));
        
        

        
        
        setMatches(groupedArray); 
        console.log(matches);
        

      



       
        
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
          
          {matches.map((match, matchIndex) => (
  <>
    <tr key={match.dateString}>
      <td>
        <div className="day">
          {matches && matches.length > 0 ? (
            <div className="day">{match.dateString}</div>
          ) : (
            <div>No matches available</div>
          )}
        </div>
      </td>
    </tr>
    {match.items.map((match, itemIndex) => (
      <tr>
        <td>
          <div key={match.team1Id} id={"box" + `${match.team1Id}`} className="awayBox">
            <table cellSpacing="0" cellPadding="0">
              <tbody>
                <tr>
                  <td style={{ display: "none" }}>
                    <input
                      style={{ display: "none" }}
                      type="radio"
                      name={itemCounter}
                    ></input>
                  </td>
                  <td>
                    <img
                      className="h"
                      src={teamLogos[match.team1Id]}
                      alt={`${match.team1} Logo`}
                    />
                  </td>
                  <td>
                    <span className="teamName">{match.team1}</span>
                    <span className="teamAbbr"></span>
                    <span className="teamRecord">({match.record1})</span>
                    <span className="teamLocation">Away</span>
                  </td>
                </tr>
              </tbody>
            </table>

           
          </div>
          <div key={match.team2Id} id={"box" + `${match.team2Id}`} className="homeBox">
            <table cellSpacing="0" cellPadding="0">
              <tbody>
                <tr>
                  <td style={{ display: "none" }}>
                  
                    <input
                      style={{ display: "none" }}
                      type="radio"
                      name={itemCounter}
                    ></input>
                  </td>
                  <td>
                    <img
                      className="h"
                      src={teamLogos[match.team2Id]}
                      alt={`${match.team2} Logo`}
                    />
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

            {/* Increment the counter here */}
            
          </div>
        </td>
        {itemCounter++}
      </tr>

      
    ))}
  </>
))}

         
        </tbody>
      </table>


     
      </form>
      </div>
    </div>
  );
}
export default ApiTest;