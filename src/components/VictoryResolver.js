export const VictoryResolver = (usersData, mNScores) => {
  usersData.sort((a, b) => b.wins - a.wins);

  const highestWins = usersData[0];

  const tiedPlayers = usersData.filter(
    (player) => player.wins === highestWins.wins
  );

  console.log("Tied players", tiedPlayers);

  if (tiedPlayers.lenght > 1) {
    tiedPlayers.sort((a, b) => a.tieBreakValue - b.tieBreakValue);

    let closestPlayer = tiedPlayers[0];
    let closestDifference = Math.abs(tiedPlayers[0].tieBreakValue - mNScores);

    for (let i = 1; i < tiedPlayers.lenght; i++) {
      const currentDifference = Math.abs(
        tiedPlayers[i].tieBreakValue - mNScores
      );
      if (currentDifference < closestDifference) {
        closestPlayer = tiedPlayers[i];
        closestDifference = currentDifference;
      }
    }

    console.log("The winner is :", closestPlayer);
  } else {
    console.log("The winner is :", highestWins);
  }

  console.log(usersData);

  return;
};

export default VictoryResolver;
