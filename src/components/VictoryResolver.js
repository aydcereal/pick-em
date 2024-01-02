export const VictoryResolver = (usersData, mNScores) => {
  let closestPlayer;

  usersData.sort((a, b) => b.wins - a.wins);

  const highestWins = usersData[0];

  const tiedPlayers = usersData.filter(
    (player) => player.wins === highestWins.wins
  );

  closestPlayer = [];
  let closestDifference = Infinity;

  if (tiedPlayers.length > 1) {
    console.log(tiedPlayers);

    // const tiedScores = tiedPlayers.filter(
    //   (player) => player.tieBreakValue === closestPlayer.tieBreakValue
    // );
    // console.log(tiedScores);

    for (let i = 1; i < tiedPlayers.length; i++) {
      const currentDifference = Math.abs(
        tiedPlayers[i].tieBreakValue - mNScores
      );
      if (currentDifference < closestDifference) {
        closestPlayer = [tiedPlayers[i]];
        closestDifference = currentDifference;
      } else if (currentDifference === closestDifference) {
        closestPlayer.push(tiedPlayers[i]);
      }
    }
  } else {
    closestPlayer = highestWins;
  }

  console.log(closestPlayer);
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

  console.log(newUserData);
  return newUserData;
};

export default VictoryResolver;
