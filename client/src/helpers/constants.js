let nbaSeasons = [];
for (let i = 2022; i >= 1998; i--) {
    nbaSeasons.push(`${i - 1} - ${i}`);
}

const positions = {
    POINT_GUARD: "PG",
    SHOOTING_GUARD: "SG",
    SMALL_FORWARD: "SF",
    POWER_FORWARD: "PF",
    CENTER: "C",
};

const initialTeam = {
    players: [],
    teamWins: 0,
    offEfficiency: 0,
    defEfficiency: 0,
    teamMinutesLeft: 19680,
    totalMinutesPlayed: 0,
    totalShootingPercentage: 0,
    twoPtMade: 0,
    twoPtAttempt: 0,
    threePtMade: 0,
    threePtAttempt: 0,
    pointsPG: 0,
    assistsPG: 0,
    stealsPG: 0,
    blocksPG: 0,
    turnoversPG: 0,
    personalFoulsPG: 0,
    offRPG: 0,
    defRPG: 0,
    averageAge: 0,
}

export { nbaSeasons, positions, initialTeam }
