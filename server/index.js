require("dotenv").config()
const express = require("express")
const cors = require("cors")
const { playerRouter } = require("./routes/playerRoutes")
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/players', playerRouter)

app.get('/', (req, res) => {
    res.send('Hello World!!!')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});