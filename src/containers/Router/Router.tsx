import React from 'react'

import { Route, Switch, Redirect, withRouter } from 'react-router-dom'

import MainPage from '../MainPage'

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Redirect to="/" />
    </Switch>
  )
}

export default withRouter(Router)
