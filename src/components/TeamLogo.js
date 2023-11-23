const TeamLogo = ({ teamId, type }) => {
  const logoSrc = `/images/team logos/${teamId}.png`;

  if (type === "picks") {
    return (
      <div>
        <img src={logoSrc} alt={`Team ${teamId} Logo`} />
      </div>
    );
  }

  return <img src={logoSrc} alt={`Team ${teamId} Logo`} />;
};

export default TeamLogo;
