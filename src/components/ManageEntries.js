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
    const weeks = Array.from({ length: 18 }, (_, index) => `Week ${index + 1}`);


    

    useEffect(() => {
        const database = app.database();

        const userId = 'xsg02hTTKkaOsRU1vRv5okUz1Zx1';
        const poolKey = '-NctUm9lVaQTH42fq5pp';

        // Query the Firebase database to get the data
        const dataRef = database.ref('selections'); // Replace with your data path
        dataRef.on('value', (snapshot) => {
        const dataObject = snapshot.val();
        if (dataObject) {
            const userData = Object.values(dataObject).find(
            (item) => item.userId === userId && item.poolKey === poolKey
            );
            if (userData) {
            setSelections(userData.selections || []); // Use default empty array if selections is undefined
            console.log(userData.selections);
            }
        }
        });
    }, []);

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
                        
                        <select className='form-select' name="picks" id="picks">
                             {weeks.map((week, index) => (
                             <option key={index} value={week}>
                                {week}
                            </option>
                            
                                 ))}
                                     
                        </select>
                        <span style={{marginLeft: '5px'}}>Picks</span> 
                        </th>
                        <th className='d-none d-md-table-cell'>
                        Record W-L	
                        </th>
                    </tr>
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
                    </tr>
                </tbody>
            </table>
       
        </div>
        </div>
    );
    };

    export default ManageEntries;
