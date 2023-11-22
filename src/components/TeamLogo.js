


const TeamLogo = ({ teamId }) => {
    const logoSrc = (`/images/team logos/${teamId}.png`)
        
    return (
        <img
        src={logoSrc}
        alt={`Team ${teamId} Logo`}
    />
    
    );
};


export default TeamLogo;