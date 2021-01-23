import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { DisplayMapClass } from "./utils/DisplayMapClass";
import { DisplayMapFC } from "./utils/DisplayMapFC";
import MainPage from "./containers/MainPage";
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "./theme";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

function App() {
  const theme = createTheme();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
