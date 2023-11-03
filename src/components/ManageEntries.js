    import { useEffect, useState } from 'react';
    import { app } from '../firebase';
    import 'firebase/compat/database';
    import classes from './ManageEntries.css'
    
    


    const TeamLogo = ({ teamId }) => {
        const logoSrc = (`/images/team logos/${teamId}.png`)
        

        
            
        return (
            <img
            src={logoSrc}
            alt={`Team ${teamId} Logo`}
        />
        
        );
    };

    

    



    const ManageEntries = () => {
    const [selections, setSelections] = useState([]);
    const [matchingWeek, SetMachingWeek] = useState(false)
    const [currentSelectedWeek, SetCurrentSelectedWeek] = useState(0)
    const weeks = Array.from({ length: 18 }, (_, index) => `Week ${index + 1}`);


    

    useEffect(() => {

        console.log('useEffect triggered');
        const database = app.database();

        const userId = 'xsg02hTTKkaOsRU1vRv5okUz1Zx1';  // temporary
        const poolKey = '-NctUm9lVaQTH42fq5pp';         // temporary
        

        // Query the Firebase database to get the data
        const dataRef = database.ref('selections'); 
        dataRef.on('value', (snapshot) => {
        const dataObject = snapshot.val();
        if (dataObject) {
            console.log(currentSelectedWeek);
            const userData = Object.values(dataObject).find(
            (item) => 
            item.userId === userId && 
            item.poolKey === poolKey &&
            item.week === parseInt(currentSelectedWeek)
            
            );
            if (userData) {
            setSelections(userData.selections || []); // Use default empty array if selections is undefined
            SetMachingWeek(true)
            ;
            } else {
                SetMachingWeek(false)
            }
        } else {
            SetMachingWeek(false)
        }
        });
    }, [currentSelectedWeek]);

    return (
        <div className='row entries'>
            <div className='col-md-12'>
            <table className='table-responsive'>
                <tbody>
                    <tr className='headerRow'>
                        <th className='col-md-2 vert-align entry'>
                            Entry
                        </th>
                        <th className='col-md-7 vert-align text-center pickCell'>
                        
                        <select 
                            className='form-select' 
                            name="picks" 
                            id="picks"
                            onChange={(e) =>{ 
                                SetCurrentSelectedWeek(e.target.value);
                               ;
                            }}
                            >
                            
                             {weeks.map((week, index) => (
                             <option key={index} value={index + 1}>
                                {week}
                            </option>
                            
                                 ))}
                                     
                        </select>
                        <span style={{marginLeft: '5px'}}>Picks</span> 
                        </th>
                        <th className='d-none d-md-table-cell'>
                        Record W-L	
                        </th>
                        <th></th>
                    </tr>
                   {matchingWeek &&
                         <tr className='pickRow'>
                         <td className='col-md-2 vert-align entry'>
                             <div>Jordy Figueroa</div>
                             
                         </td>
                         <td className='col-md-7 vert-align text-center pickCell' >
                             {selections.map((item, index)=> (
                                 <span className='p'>
                                     
                                     <TeamLogo teamId={item}/>
                                     
                                 
                                 </span>
                             ))}
                         </td>
                         <td className='cold-md-1 text-center vert-align'>
                         <span class="statusAlive">0-0</span>           
                         </td>
                         <td class="col-md-1 text-center vert-align">
								<div class="btn-group">
								  <button type="button" id="btnGroupOptions" class="btn btn-default" data-bs-toggle="dropdown" aria-expanded="false">
										
										<span class="far fa-ellipsis-v fa-2x"></span>
								  </button>
								 
								</div>
							</td>
                     </tr> || 
                     <tr className='pickRow'>
                         <td className='col-md-2 vert-align entry'>
                             <div>Jordy Figueroa </div>
                             
                         </td>
                         <td className='col-md-7 vert-align text-center pickCell' >
                            <a class="btn btn-danger">
                                <i class="far fa-pencil pe-1 d-none d-md-inline"></i> 
                                Make Your Picks
                            </a>
                         </td>
                         <td className='cold-md-1 text-center vert-align'>
                         <span class="statusAlive">0-0</span>           
                         </td>
                         <td class="col-md-1 text-center vert-align">
								<div class="btn-group">
								  <button type="button" id="btnGroupOptions" class="btn btn-default" data-bs-toggle="dropdown" aria-expanded="false">
										
										<span class="far fa-ellipsis-v fa-2x"></span>
								  </button>
								 
								</div>
							</td>
                     </tr>
                   } 
                   
                  
                </tbody>
            </table>
       
        </div>
        </div>
    );
    };

    export default ManageEntries;
