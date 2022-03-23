const addPlayerToTeam = (player, year, currentTeam) => {
    const numOfPlayers = currentTeam.players.length
    const newTotalMinutesPlayed =
        currentTeam.totalMinutesPlayed + player.minutesPlayed
    const season = `${year} `
    player = { ...player, season }
    let yearEnd = year.substring(year.indexOf('-') + 1).trim()
    currentTeam.players.push(player)
    currentTeam.pointsPG = addPGstats('points', player, currentTeam)
    currentTeam.assistsPG = addPGstats('assists', player, currentTeam)
    currentTeam.stealsPG = addPGstats('steals', player, currentTeam)
    currentTeam.blocksPG = addPGstats('blocks', player, currentTeam)
    currentTeam.turnoversPG = addPGstats('turnovers', player, currentTeam)
    currentTeam.personalFoulsPG = addPGstats('personalFouls', player, currentTeam)
    currentTeam.offRPG = addPGstats('offR', player, currentTeam)
    currentTeam.defRPG = addPGstats('defR', player, currentTeam)
    currentTeam.twoPtMade += player.twoPtMade
    currentTeam.twoPtAttempt += player.twoPtAttempt
    currentTeam.threePtMade += player.threePtMade
    currentTeam.threePtAttempt += player.threePtAttempt
    currentTeam.totalShootingPercentage =
        numOfPlayers > 1
            ? (
                  (currentTeam.totalShootingPercentage * currentTeam.totalMinutesPlayed +
                      player.trueShootingPercentage * player.minutesPlayed) /
                  newTotalMinutesPlayed
              )
            : player.trueShootingPercentage
    currentTeam.offEfficiency = adjustEfficiency("off", "add", player, currentTeam)
    currentTeam.defEfficiency = adjustEfficiency("def", "add", player, currentTeam)
    currentTeam.totalMinutesPlayed = newTotalMinutesPlayed
    currentTeam.teamMinutesLeft =
        yearEnd !== 2020
            ? 19680 - currentTeam.totalMinutesPlayed
            : 17280 - currentTeam.totalMinutesPlayed
    currentTeam.teamWins += player.winShares
    currentTeam.averageAge =
        (currentTeam.averageAge * numOfPlayers + player.age) / (numOfPlayers + 1)
    console.log("Current Team: " + currentTeam)
    return currentTeam
}


const releasePlayerFromTeam = (releasedPlayer, teamInfo) => {
    const newTotalMinutesPlayed =
        teamInfo.totalMinutesPlayed - releasedPlayer.minutesPlayed
    teamInfo.team = teamInfo.team.filter(
        (player) => player.name !== releasedPlayer.name
    )
    const numOfPlayers = teamInfo.players.length
    teamInfo.pointsPG = reducePGstats('points', releasedPlayer, teamInfo)
    teamInfo.assistsPG = reducePGstats('assists', releasedPlayer, teamInfo)
    teamInfo.blocksPG = reducePGstats('blocks', releasedPlayer, teamInfo)
    teamInfo.stealsPG = reducePGstats('steals', releasedPlayer, teamInfo)
    teamInfo.turnoversPG = reducePGstats('turnovers', releasedPlayer, teamInfo)
    teamInfo.personalFoulsPG = reducePGstats('personalFouls', releasedPlayer, teamInfo)
    teamInfo.offRPG = reducePGstats('offR', releasedPlayer, teamInfo)
    teamInfo.defRPG = reducePGstats('defR', releasedPlayer, teamInfo)
    teamInfo.twoPtMade -= releasedPlayer.twoPtMade
    teamInfo.twoPtAttempt -= releasedPlayer.twoPtAttempt
    teamInfo.threePtMade -= releasedPlayer.threePtMade
    teamInfo.threePtAttempt -= releasedPlayer.threePtAttempt
    teamInfo.totalShootingPercentage =
        numOfPlayers > 1
            ? (
                  (teamInfo.totalShootingPercentage * teamInfo.totalMinutesPlayed -
                      releasedPlayer.trueShootingPercentage *
                          releasedPlayer.minutesPlayed) /
                  newTotalMinutesPlayed
              )
            : numOfPlayers > 0
            ? teamInfo.team[0].trueShootingPercentage
            : 0
    teamInfo.totalMinutesPlayed = newTotalMinutesPlayed
    teamInfo.teamMinutesLeft += releasedPlayer.minutesPlayed
    teamInfo.offEfficiency =
        numOfPlayers > 0
            ? adjustEfficiency("off", "subtract", releasedPlayer, teamInfo)
            : 0
    teamInfo.defEfficiency =
        numOfPlayers > 0
            ? adjustEfficiency("def", "subtract", releasedPlayer, teamInfo)
            : 0
    teamInfo.teamWins -= releasedPlayer.winShares
    teamInfo.averageAge = numOfPlayers
        ? (teamInfo.averageAge * (numOfPlayers + 1) - releasedPlayer.age) /
          numOfPlayers
        : 0
    return teamInfo
}


const addPGstats = (stat, player, teamInfo) => {
    const totalGames = (player.year === '2020') ? 72 : 82
    return teamInfo[`${stat}PG`] += (player[stat] / totalGames)
}


const reducePGstats = (stat, player, teamInfo) => {
    const totalGames = (player.year === '2020') ? 72 : 82
    return (teamInfo.team.length) ? teamInfo[`${stat}PG`] -= (player[stat] / totalGames) : 0
}


const adjustEfficiency = (stat, action, player, teamInfo) => {
    const numOfPlayers = teamInfo.players.length
    if (numOfPlayers > 0) {
        return action === "add"
            ? parseFloat((teamInfo[`${stat}Efficiency`] * teamInfo.teamWins +
                  player[`${stat}WinShares`]) /
                  (teamInfo.teamWins + player.winShares)).toFixed(12)
            : parseFloat((teamInfo[`${stat}Efficiency`] * teamInfo.teamWins -
                  player[`${stat}WinShares`]) /
                  (teamInfo.teamWins - player.winShares)).toFixed(12)
    } else {
        return (
            parseFloat(teamInfo.team[0][`${stat}WinShares`] /
            (teamInfo.teamWins + player.winShares)).toFixed(12)
        )
    }
}


export { addPlayerToTeam, releasePlayerFromTeam }