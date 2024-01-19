export const VictoryResolver = (usersData, mNScores) => {
  let closestPlayer;

  console.log(usersData);

  usersData.sort((a, b) => b.wins - a.wins);

  const highestWins = usersData[0];

  const tiedPlayers = usersData.filter(
    (player) => player.wins === highestWins.wins
  );

  closestPlayer = [];
  let closestDifference = Infinity;

  if (tiedPlayers.length > 1) {
    // const tiedScores = tiedPlayers.filter(
    //   (player) => player.tieBreakValue === closestPlayer.tieBreakValue
    // );
    // console.log(tiedScores);
    console.log(tiedPlayers);
    for (let i = 0; i < tiedPlayers.length; i++) {
      console.log(tiedPlayers[i]);
      const currentDifference = Math.abs(
        tiedPlayers[i].tieBreakValue - mNScores
      );
      console.log(currentDifference);
      console.log(closestDifference);
      if (currentDifference < closestDifference) {
        closestPlayer = [tiedPlayers[i]];
        console.log(closestPlayer);
        closestDifference = currentDifference;
      } else if (currentDifference == closestDifference) {
        closestPlayer.push(tiedPlayers[i]);
      }
    }
  } else {
    closestPlayer = [highestWins];
  }

  console.log(closestPlayer);
  const newUserData = usersData.map((item) => {
    const closestPlayerData =
      closestPlayer &&
      closestPlayer.some((player) => player.playerName === item.playerName)
        ? true
        : false;

    console.log(closestPlayerData);
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
