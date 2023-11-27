import classes from "../pages/picks.css";

const TeamLogo = ({ teamId, type, imgclass }) => {
  const logoSrc = `/images/team logos/${teamId}.png`;

  if (type === "picks") {
    return (
      <div className="t">
        <img src={logoSrc} alt={`Team ${teamId} Logo`} />
      </div>
    );
  }

  return <img className={imgclass} src={logoSrc} alt={` ${teamId} Logo`} />;
};

export default TeamLogo;
