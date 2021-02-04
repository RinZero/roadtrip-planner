import React from 'react'

import { Route, Switch, Redirect, withRouter } from 'react-router-dom'

import MainPage from '../MainPage'
import SignUpPage from '../SignUpPage'
import TestPage from '../TestPage'

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/test" component={TestPage} />
      <Route exact path="/sign_up" component={SignUpPage} />
      <Redirect to="/" />
    </Switch>
  )
}

export default withRouter(Router)
