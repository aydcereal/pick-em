import { relative } from 'path-browserify';
import classes from './progressCircle.css'
import React, { useState, useEffect } from 'react';
import { ActionAnchor } from './Components.styled';

const ProgressCircle = ({
    progress, 
    gradientColor, 
    id,
    title,
    value,
    action
}) => {
    
    
    const radius = 40;
    const circumference = 2 * Math.PI * radius;

    const [offset, SetOffset] = useState(circumference)

    
    

    useEffect(()=> {

        const progressOffset = ((100 - progress) / 100) * circumference;
        SetOffset(progressOffset);
    },[progress, circumference])



   let gradient
   

    switch (gradientColor) {
        case "gray":
                gradient = <>
                <stop offset="0%" stopColor="#646964" />
                <stop offset="100%" stopColor="#a1a6a1" />
                </>

            break;
        case "green":
                gradient = <>
                <stop offset="0%" stopColor="#11d92c" />
                <stop offset="100%" stopColor="#116a05" />
                </>

            break;
        case "red":
                gradient = <>
                <stop offset="0%" stopColor="#f01229" />
                <stop offset="100%" stopColor="#6b060d" />
                </>

            break;
    
        default:
            break;
    }


    





    return (<>
        <div className= 'pie-progress-charts col-md-2 col-4' >
                                <div className='inner-pchart'>
                                    <div className='circle'>
                                        <div className="circles-wrp" style={{position: 'relative', display: 'inline-block'}}>
                                        <div className='skill' style={{ '--gradient-id': `url(#${id})` }}>
            <div className='outer'>
                <div className='inner'>
                    <div id='number'>{value}</div>
                </div>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="90px" height="90px">
            <defs>
            <linearGradient id={id}>
                    {gradient}
                </linearGradient>
            </defs>
            <circle 
                cx="45" 
                cy="45" 
                r={radius}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                stroke={`url(#${id})`} 
                 />
        </svg>  
        </div>
                                        
                                        </div>
                                    </div>
                                    <h3 className="circle-title">{title}</h3>
                                    <p className="noprint">
                                        <ActionAnchor>{action}</ActionAnchor>
                                    </p>
                                </div>
                            </div>



        

           
</>
    )
}


export default ProgressCircle