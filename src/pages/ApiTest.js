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
  const [matchData, setMatchData] = useState([]);
  const [teamLogos, setTeamLogos] = useState({});
  const [selections, setSelections] = useState({});
  const [selectedDivId, setSelectedDivId] = useState(null);
  let lastDate = ""
  


  useEffect(() => {
    const API_ENDPOINT_URL = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?seasontype=2&week=2&dates=2023";

    

    fetch(API_ENDPOINT_URL)
      .then(response => response.json())
      .then(data => {
        if (!data || !Array.isArray(data.events)) {
          console.error("Data structure is not as expected");
          return;
        }
        const events = data.events || [];

        
        

      

        
        

        events.forEach(event => {

          if (!event || !Array.isArray(event.competitions)) {
            console.error("Event structure is not as expected");
            return;
          }

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
        
                setMatchData(prevMatches => {
                  // Check if an item with the same properties already exists
                  const itemExists = prevMatches.some(
                    item =>
                      item.team1 === team1 &&
                      item.record1 === record1 &&
                      item.team1Id === team1Id &&
                      item.team2 === team2 &&
                      item.record2 === record2 &&
                      item.team2Id === team2Id &&
                      item.dateString === dateString
                  );
                
                  // Only add the new item if it doesn't already exist
                  if (!itemExists) {
                    return [...prevMatches, { team1, record1, team1Id, team2, record2,team2Id, dateString }];
                  } else {
                    return prevMatches;
                  }
                });
               
            }
          });

        });

       

      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  
  


 
  

  

  const handleSelection = (matchId, teamId) => {
    setSelections(prevSelections => ({
      ...prevSelections,
      [matchId]: teamId
    }));
  };

  const handleSubmit = (event) => {
    // Submit the selections
    event.preventDefault()
    console.log("selections: ", selections);

    const numberToNameMapping = {};

    for(const key in selections){

        console.log(selections[key]);
      if(selections.hasOwnProperty(key)){
        const teamId = selections[key]
        const teamAbbreviation = Object.keys(teamNameMapping).find(
          (abbr) => teamNameMapping[abbr].id === teamId
        )


        if(teamAbbreviation) {
          numberToNameMapping[key] = teamNameMapping[teamAbbreviation].name
        }
      }

      
    }

    console.log("numberToNameMapping: ", numberToNameMapping);
    
  };

  let indexCounter = 1;
  

  

 const [selected, setSelected] = useState([]);

 

  


  useEffect(() => {

    matchData.forEach(match => {
      
        getTeamLogo(match.team1Id).then(logo => {
          setTeamLogos(logos => ({ ...logos, [match.team1Id]: logo }));
        });
        getTeamLogo(match.team2Id).then(logo => {
          setTeamLogos(logos => ({ ...logos, [match.team2Id]: logo }));
        });
      
    });

  }, [matchData]);

  const sortedMatches = [...matchData].sort ((a,b) =>{
    const dateA = new Date(a.dateString);
    const dateB = new Date(b.dateString);
    return dateA - dateB
  })


 

 

  const handleDivClick = (index, teamId) => {
    
    
    
    setSelected((prevState) => {
      // Check if the teamId already exists in prevState
      const existingIndex = prevState.findIndex((item) => item.index === index);
  
      if (existingIndex !== -1) {
        // If it exists, update the item with the new values
        const updatedItem = {
          ...prevState[existingIndex],
        
          teamId: teamId
        };
  
        // Create a new array with the updated item
        const newArray = [...prevState];
      newArray[existingIndex] = updatedItem;

    
        console.log(selected);
      return newArray;
    } else {
      // If it doesn't exist, add a new item to the array
      const newItem = {
        index: index,
        teamId: teamId,
      };

      console.log([...prevState, newItem]); // Log the updated array here
      console.log(selected);
      return [...prevState, newItem];
    }
  });
};







 


     
  return (<>
    <div className='container'>
      <div className='col-md-7'>
        <form onSubmit={handleSubmit}>
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

          
          {sortedMatches.map((match, index) => {
 
  
            
            let tempLastDate = lastDate;
           

            const isNewDate = match.dateString !== tempLastDate;
                  if(isNewDate){
                   
                    tempLastDate = match.dateString;
                    lastDate = tempLastDate
                    
                  }
      
                  return (
                    <>
                      {isNewDate && (
                        <tr key={match.dateString}>
                          <td>
                            <div className="day">
                              {matchData && matchData.length > 0 ? (
                                <div className="day">{match.dateString}</div>
                              ) : (
                                <div>No matches available</div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                
                      <tr>
                        <td>
                          <div
                            key={match.team2Id}
                            id={"box" + `${match.team2Id}`}
                            className={`homeBox ${selected.some((element) => element.teamId === match.team2Id) ? 'selected' : ''}`}
                            onClick={() => handleDivClick(index, match.team2Id)}
                          >

                                <table cellSpacing='0' cellPadding='0'>
                                  <tbody>
                                    <tr>
                                      <td >
                                        <input
                                          type="radio"
                                          name={index}
                                          value={match.team2Id}
                                          onChange={() => handleSelection(index, match.team2Id)}
                                          
                                          
                                        />
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
                                <div
                                  
                                  key={match.team1Id}
                                  id={"box" + `${match.team1Id}`}
                                  onClick={() => handleDivClick(index, match.team1Id)}
                                  className={`homeBox ${selected.some((element) => element.teamId === match.team1Id) ? 'selected' : ''}`}
                                >

                              <table cellSpacing='0' cellPadding='0'>
                                  <tbody>
                                    <tr>
                                    <td >
                                      <input
                                        type="radio"
                                        name={index}
                                        value={match.team1Id}
                                        onClick={() => handleSelection(index, match.team1Id)}
                                        
                                        
                                      />
                                      </td>
                                      <td>
                                      <img className='h' src={teamLogos[match.team1Id]} alt={`${match.team1} Logo`} />
                                        
                                        
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

                              </td>
                                  <div style={{display:"none"}}>
                                    {indexCounter++}
                                    
                                    
                                    </div>
                              

                            </tr>

            </>
          );
        })}



          

        </tbody>
      </table>

                <button className='btn'>Submit</button>
     
      </form>
      </div>
    </div>
    </>);
}
export default ApiTest;