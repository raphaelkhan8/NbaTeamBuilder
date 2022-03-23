import React, { Fragment } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PlayersList from './PlayersList'

const Players = (props) => {

    const {
        pointGuards,
        shootingGuards,
        smallForwards,
        powerForwards,
        centers,
        teamInfo,
        year
    } = props

    return (
        <BrowserRouter>
            <Switch>
                <Route path='/pointGuards'>
                    <Fragment>
                        <h3>POINT GUARDS</h3>
                        <PlayersList players={pointGuards} teamInfo={teamInfo} year={year} />
                    </Fragment>
                </Route>
                <Route path='/shootingGuards'>
                    <Fragment>
                        <h3>SHOOTING GUARDS</h3>
                        <PlayersList players={shootingGuards} teamInfo={teamInfo} year={year} />
                    </Fragment>
                </Route>
                <Route path='/smallForwards'>
                    <Fragment>
                        <h3>SMALL FORWARDS</h3>
                        <PlayersList players={smallForwards} teamInfo={teamInfo} year={year} />
                    </Fragment>
                </Route>
                <Route path='/powerForwards'>
                    <Fragment>
                        <h3>POWER FORWARDS</h3>
                        <PlayersList players={powerForwards} teamInfo={teamInfo} year={year} />
                    </Fragment>
                </Route>
                <Route path='/centers'>
                    <Fragment>
                        <h3>CENTERS</h3>
                        <PlayersList players={centers} teamInfo={teamInfo} year={year} />
                    </Fragment>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Players