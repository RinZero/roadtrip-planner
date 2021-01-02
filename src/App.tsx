import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { DisplayMapClass } from "./utils/DisplayMapClass";
import { DisplayMapFC } from "./utils/DisplayMapFC";
import MainPage from "./containers/MainPage";
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "./theme";

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
        <MainPage />
        <DisplayMapFC />
      </ThemeProvider>
    </div>
  );
}

export default App;
