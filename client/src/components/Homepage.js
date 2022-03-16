import axios from 'axios'
import { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { nbaSeasons } from '../helpers/constants'
import Players from '../components/Players'
import Nav from '../components/Nav'

const HomePage = () => {

    const [year, setYear] = useState('2021 - 2022')
    const [centers, set_centers] = useState([])
    const [power_forwards, set_power_forwards] = useState([])
    const [small_forwards, set_small_forwards] = useState([])
    const [shooting_guards, set_shooting_guards] = useState([])
    const [point_guards, set_point_guards] = useState([])

    const getPlayerList = async (year) => {
        let yearEnd = year.substring(year.indexOf('-') + 1).trim()
        const { data } = await axios.get(`http://localhost:5000/api/players/${yearEnd}`)
        if (data) {
            set_centers(data.CENTER)
            set_power_forwards(data.POWER_FORWARD)
            set_small_forwards(data.SMALL_FORWARD)
            set_shooting_guards(data.SHOOTING_GUARD)
            set_point_guards(data.POINT_GUARD)
        }
    }

    return (
        <div>
            <Form className='selectYearForm'>
                <FormGroup>
                <Label for='yearSelect'>Select a NBA season</Label>
                <Input type='select' name='select' id='yearSelect' value={year} onChange={e => setYear(e.target.value)}>
                    {nbaSeasons.map((nbaSeason, index) => (
                        <option key={index}>{nbaSeason}</option>
                    ))}
                </Input>
                <Button type='button' name='button' onClick={() => getPlayerList(year)}>Get Players</Button>
                </FormGroup>
            </Form>

            {centers.length ? (
                <div className='players'>
                    <h1>{year} NBA season stats</h1>

                    <Nav />

                    <Players
                        pointGuards={point_guards}
                        shootingGuards={shooting_guards}
                        smallForwards={small_forwards}
                        powerForwards={power_forwards}
                        centers={centers}
                    />
                </div>
            ) : (
                <div className="instructions">
                    Select a season to get the player stats
                    from that season
                </div>
            )}
        </div>
    )
}

export default HomePage