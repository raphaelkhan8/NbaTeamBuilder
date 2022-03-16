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

export { nbaSeasons, positions }
