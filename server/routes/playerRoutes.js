const router = require("express").Router()
const { getPlayers, groupPlayers } = require("../controllers/playerStats")


router.get('/:year', async (req, res) => {
    const { year } = req.params
    const players = await getPlayers(Number(year))
    const groupedPlayers = groupPlayers(players)
    res.send(groupedPlayers)
})


module.exports.playerRouter = router