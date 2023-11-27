const TeamLogo = ({ teamId, type, winner }) => {
  const logoSrc = `/images/team logos/${teamId}.png`;
  console.log(teamId);

  if (type === "picks") {
    return (
      <div className={winner}>
        <img src={logoSrc} alt={`Team ${teamId} Logo`} />
      </div>
    );
  }

  return <img src={logoSrc} alt={`Team ${teamId} Logo`} />;
};

export default TeamLogo;
