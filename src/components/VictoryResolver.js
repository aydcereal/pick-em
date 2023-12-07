export const VictoryResolver = (usersData, mNScores) => {
  let closestPlayer;

  usersData.sort((a, b) => b.wins - a.wins);

  const highestWins = usersData[0];

  const tiedPlayers = usersData.filter(
    (player) => player.wins === highestWins.wins
  );

  if (tiedPlayers.length > 1) {
    tiedPlayers.sort((a, b) => a.tieBreakValue - b.tieBreakValue);

    closestPlayer = tiedPlayers[0];
    let closestDifference = Math.abs(tiedPlayers[0].tieBreakValue - mNScores);

    for (let i = 1; i < tiedPlayers.length; i++) {
      const currentDifference = Math.abs(
        tiedPlayers[i].tieBreakValue - mNScores
      );
      if (currentDifference < closestDifference) {
        closestPlayer = tiedPlayers[i];
        closestDifference = currentDifference;
      }
    }
  } else {
    closestPlayer = highestWins;
  }
  const newUserData = usersData.map((item) => {
    const closestPlayerData =
      closestPlayer && closestPlayer.playerName === item.playerName
        ? true
        : false;

    return {
      playerName: item.playerName,
      tieBreakValue: item.tieBreakValue,
      selections: item.selections,
      wins: item.wins,
      champion: closestPlayerData,
    };
  });

  return newUserData;
};

export default VictoryResolver;
