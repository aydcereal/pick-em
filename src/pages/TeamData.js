import TeamNameMapping from '../components/TeamNameMapping';





const TeamData = (week) => {

    return new Promise((resolve, reject) =>{

       
            const API_ENDPOINT_URL = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?seasontype=2&week=${week}&dates=2023`;
        
            
        
            fetch(API_ENDPOINT_URL)
              .then(response => response.json())
              .then(data => {
                if (!data || !Array.isArray(data.events)) {
                  console.error("Data structure is not as expected");
                  return;
                }

                const matches = []

                const events = data.events || [];
        
                events.forEach(event => {
                  try {
                    if (!event || !Array.isArray(event.competitions)) {
                      console.error("Event structure is not as expected");
                      return;
                    }
        
                    const competitions = event.competitions || [] ;
        
                    competitions.forEach(competition => {
                      const competitors = competition.competitors;
        
                      if (competitors.length === 2) {
                        const team1Abbr = competitors[1].team.abbreviation;
                        const team2Abbr = competitors[0].team.abbreviation;
    
                        const team1Info = TeamNameMapping[team1Abbr] || { name: team1Abbr, id: -1 };
                        const team2Info = TeamNameMapping[team2Abbr] || { name: team2Abbr, id: -1 };
                        
                        const date = new Date(event.date)
                    
                        const team1Id = team1Info.id;
                        const team2Id = team2Info.id;

                        const match = {team1Id, team2Id, date, team1Abbr, team2Abbr};

                        const itemExists = matches.some(
                          item =>
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
        
                resolve(matches);
              })
              .catch(error => {
                console.error("Error fetching data:", error);
              });
          });
        };
        
        export default TeamData;