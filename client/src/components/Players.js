import React, { Fragment } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PlayersList from './PlayersList'

const Players = (props) => {

    const {
        pointGuards,
        shootingGuards,
        smallForwards,
        powerForwards,
        centers
    } = props

    return (
        <BrowserRouter>
            <Switch>
                <Route path='/pointGuards'>
                    <Fragment>
                        <h2>POINT GUARDS</h2>
                        <PlayersList players={pointGuards} />
                    </Fragment>
                </Route>
                <Route path='/shootingGuards'>
                    <Fragment>
                        <h2>SHOOTING GUARDS</h2>
                        <PlayersList players={shootingGuards} />
                    </Fragment>
                </Route>
                <Route path='/smallForwards'>
                    <Fragment>
                        <h2>SMALL FORWARDS</h2>
                        <PlayersList players={smallForwards} />
                    </Fragment>
                </Route>
                <Route path='/powerForwards'>
                    <Fragment>
                        <h2>POWER FORWARDS</h2>
                        <PlayersList players={powerForwards} />
                    </Fragment>
                </Route>
                <Route path='/centers'>
                    <Fragment>
                        <h2>CENTERS</h2>
                        <PlayersList players={centers} />
                    </Fragment>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Players