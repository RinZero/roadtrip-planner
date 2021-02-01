import React from 'react'

import { Route, Switch, Redirect, withRouter } from 'react-router-dom'

import TestPage from '../TestPage'

const Router = () => {
  return (
    <Switch>
      <Route exact path="/test" component={TestPage} />
      <Redirect to="/" />
    </Switch>
  )
}

export default withRouter(Router)
