import React from "react";
import MainPage from "../MainPage";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Redirect to="/" />
    </Switch>
  );
};

export default withRouter(Router);
