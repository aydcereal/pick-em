import styles from './progressCircle.module.css'
import React, { useState, useEffect } from 'react';

const ProgressCircle = ({progress}) => {
    console.log(progress);

    const [offset, SetOffset] = useState(0)

    const radius = 40;
    const circumference = 2 * Math.PI * radius;

    useEffect(()=> {

        const progressOffset = ((100 - progress) / 100) * circumference;
        SetOffset(progressOffset);
    },[progress, circumference])


    return (<>
        <div className={styles.skill}>
            <div className={styles.outer}>
                <div className={styles.inner}>
                    <div id={styles.number}>2</div>
                </div>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="90px" height="90px">
            <defs>
                <linearGradient id="GradientColor">
                    <stop offset="0%" stopColor="#646964" />
                    <stop offset="100%" stopColor="#a1a6a1" />
                </linearGradient>
            </defs>
            <circle 
                cx="45" 
                cy="45" 
                r={radius}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset} />
        </svg>  
        </div>

           
</>
    )
}


export default ProgressCircle