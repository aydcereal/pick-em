    import { useEffect, useState } from 'react';
    import { app } from '../firebase';
    import 'firebase/compat/database';
    import Team30Logo from '../images/team logos/30.png';
    


    const TeamLogo = ({ teamId }) => {
        const logoSrc = require(`../images/team logos/${teamId}.png`).default;

            
        return (
        <img
            src={logoSrc}
            alt={`Team ${teamId} Logo`}
            
        />
        );
    };

    console.log(TeamLogo(30));

    



    const ManageEntries = () => {
    const [selections, setSelections] = useState([]);
    


    

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
                    <tr className='pickRow'>
                        <td className='col-md-2 vert-align entry'>
                            <div>Jordy Figueroa</div>
                        </td>
                        <td className='col-md-7 vert-align text-center pickCell' >
                            {selections.map((item, index)=> (
                                <span>
                                    <TeamLogo teamId={item}/>
                                    
                                
                                </span>
                            ))}
                        </td>
                    </tr>
                </tbody>
            </table>
        {/* <ul>
            {selections.map((item, index) => (
            <li key={index}>{item}</li>
            ))}
        </ul> */}
        </div>
        </div>
    );
    };

    export default ManageEntries;
