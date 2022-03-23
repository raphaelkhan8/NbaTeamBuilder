import { useEffect, useState } from 'react'
import { Container, Col, Row, Table, Button } from 'reactstrap'
import { v4 as uuidv4 } from 'uuid'
import Swal from 'sweetalert2'
import { initialTeam } from '../helpers/constants'
import { addPlayerToTeam } from '../helpers/teamHelpers'

const PlayersList = (props) => {

    const { players, year } = props

    const [sorted, setSorted] = useState(false)
    const [playerList, setPlayerList] = useState([])

    useEffect(() => {
        setPlayerList(players)
    }, [players])

    const sortPlayers = (stat) => {
        (sorted === false) ? (isNaN(typeof playerList[0][stat])) ? 
            playerList.sort((a, b) => (a[stat] > b[stat]) ? -1 : 1) && setSorted(true) :  
            playerList.sort((a, b) => a[stat] - b[stat]) && setSorted(true) :
        playerList.reverse() && setSorted(false)
    }

    const addPlayer = (selectedPlayer, year) => {
        // Get the savedTeam object from local storage
        const savedTeam = (localStorage.getItem('savedTeam')) ? 
            JSON.parse(localStorage.getItem('savedTeam')) : initialTeam

        console.log("SavedTeam: " + savedTeam)

        // Make sure their are enough position spaces and minutes left to add the player
        const numOfSamePosition = savedTeam.players.filter(player => player.position === selectedPlayer.position).length
        if (numOfSamePosition >= 4) {
            Swal.fire(`You can not add any more ${selectedPlayer.position.replace("_", " ")}S (Max: 4)`);
            return
        }
        const enoughMintues = savedTeam.teamMinutesLeft - selectedPlayer.minutesPlayed >= 0
        if (!enoughMintues) {
            Swal.fire(`Not enough minutes to add ${selectedPlayer.name}`)
            return
        }

        // If okay, add the player and adjust the team stats
        const teamWithAddedPlayer = addPlayerToTeam(selectedPlayer, year, savedTeam)

        // Finally save the new team in localStorage
        localStorage.setItem('savedTeam', JSON.stringify(teamWithAddedPlayer))

        // If player is successfully added, filter the added player out of the player list
        setPlayerList(playerList.filter(p => p !== selectedPlayer))
    }

    return (
        <Container className='mt-4'>
            <Row>
                <Col>
                    <Table
                        text-align='center'
                        responsive
                        hover
                        color='black'
                        bordered
                        size='md'
                        sm={{ size: 12 }}
                        md={{ size: 10, offset: 1 }}
                    >
                        <thead className='bg-green'>
                            <tr>
                                <th>Name <i className='fa fa-fw fa-sort' onClick={() => sortPlayers('lastName')}></i></th>
                                <th>Team <i className='fa fa-fw fa-sort' onClick={() => sortPlayers('team')}></i></th>
                                <th title="Player's age during season">Age<i className='fa fa-fw fa-sort' onClick={() => sortPlayers('age')}></i></th>
                                <th title='Minutes played during season'>Mins<i className='fa fa-fw fa-sort' onClick={() => sortPlayers('minutesPlayed')}></i></th>
                                <th title='Games played during season'>Games<i className='fa fa-fw fa-sort' onClick={() => sortPlayers('gamesPlayed')}></i></th>
                                <th title='Points Per Game'>PPG<i className='fa fa-fw fa-sort' onClick={() => sortPlayers('points')}></i></th>
                                <th title='Assists Per Game'>APG<i className='fa fa-fw fa-sort' onClick={() => sortPlayers('assists')}></i></th>
                                <th title='Rebounds Per Game'>RPG<i className='fa fa-fw fa-sort' onClick={() => sortPlayers('rebounds')}></i></th>
                                <th title='Blocks Per Game'>BPG<i className='fa fa-fw fa-sort' onClick={() => sortPlayers('blocks')}></i></th>
                                <th title='Steals Per Game'>SPG<i className='fa fa-fw fa-sort' onClick={() => sortPlayers('steals')}></i></th>
                                <th title='Turnovers Per Game'>TOPG<i className='fa fa-fw fa-sort' onClick={() => sortPlayers('turnovers')}></i></th>
                                <th title='Field Goal Percentage'>2P%<i className='fa fa-fw fa-sort' onClick={() => sortPlayers('twoPointPercentage')}></i></th>
                                <th title='3pt Field Goal Percentage'>3P%<i className='fa fa-fw fa-sort' onClick={() => sortPlayers('threePointPercentage')}></i></th>
                                <th title='True Shooting Percentage'>TS%<i className='fa fa-fw fa-sort' onClick={() => sortPlayers('trueShootingPercentage')}></i></th>
                                <th title='Offensive Win Shares'>Off WS<i className='fa fa-fw fa-sort' onClick={() => sortPlayers('offWinShares')}></i></th>
                                <th title='Defensive Win Shares'>Def WS<i className='fa fa-fw fa-sort' onClick={() => sortPlayers('defWinShares')}></i></th>
                                <th title='Total Win Shares'>Total WS<i className='fa fa-fw fa-sort' onClick={() => sortPlayers('winShares')}></i></th>
                                <th title='Add Player'>Add Player</th>
                            </tr>
                        </thead>
                        <tbody>
                            {playerList.map((player) => {
                                return (
                                    <tr key={uuidv4()}>
                                        <td>{player.name}</td>
                                        <td>{player.team}</td>
                                        <td title='Player age'>{player.age}</td>
                                        <td title='Minutes played'>{player.minutesPlayed}</td>
                                        <td title='Games played'>{player.gamesPlayed}</td>
                                        <td title='Points per game'>{(player.points / player.gamesPlayed).toFixed(2)}</td>
                                        <td title='Assists per game'>{(player.assists / player.gamesPlayed).toFixed(2)}</td>
                                        <td title='Rebounds per game'>{((player.offR + player.defR) / player.gamesPlayed).toFixed(2)}</td>
                                        <td title='Blocks per game'>{(player.blocks / player.gamesPlayed).toFixed(2)}</td>
                                        <td title='Steals per game'>{(player.steals / player.gamesPlayed).toFixed(2)}</td>
                                        <td title='TOs per game'>{(player.turnovers / player.gamesPlayed).toFixed(2)}</td>
                                        <td title='2pt FG%'>{(player.twoPtMade / player.twoPtAttempt * 100).toFixed(1)}%</td>
                                        <td title='3pt FG%'>{(player.threePtMade / player.threePtAttempt * 100).toFixed(1)}%</td>
                                        <td title='True Shooting %'>{(player.trueShootingPercentage * 100).toFixed(1)}%</td>
                                        <td title='Off Win Shares'>{player.offWinShares}</td>
                                        <td title='Def Win Shares'>{player.defWinShares}</td>
                                        <td title='Total Win Shares'>{player.winShares}</td>
                                        <td title='Add Player'>
                                            <Button
                                                className='float-right mb-4 btn-custom'
                                                size='sm'
                                                color='success'
                                                onClick={() => addPlayer(player, year)}
                                            >Add
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default PlayersList