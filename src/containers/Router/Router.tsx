import React from 'react'

import { Route, Switch, Redirect, withRouter } from 'react-router-dom'

import AdminPage from '../AdminPage'
import EditPlacePage from '../EditPlacePage'
import EditRoadtripPage from '../EditRoadtripPage'
import ImprintPage from '../ImprintPage'
import MainPage from '../MainPage'
import NewPlacePage from '../NewPlacePage'
import ProfilePage from '../ProfilePage'
import SignUpPage from '../SignUpPage'

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/neuer_ort" component={NewPlacePage} />
      <Route exact path="/neuer_ort/edit/:id" component={EditPlacePage} />
      <Route exact path="/sign_up" component={SignUpPage} />
      <Route exact path="/profile" component={ProfilePage} />
      <Route exact path="/edit_roadtrip" component={EditRoadtripPage} />
      <Route exact path="/impressum" component={ImprintPage} />
      <Route exact path="/admin" component={AdminPage} />
      <Redirect to="/" />
    </Switch>
  )
}

export default withRouter(Router)
