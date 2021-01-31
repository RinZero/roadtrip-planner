import React from 'react'

import logo from './logo.svg'
import './App.css'
import { createTheme } from './theme'
import { DisplayMapClass } from './utils/DisplayMapClass'
import { FetchUser } from './utils/FetchUser'
import { CreateUser } from './utils/CreateUser'
import { DisplayMapFC } from './utils/DisplayMapFC'
import MainPage from './containers/MainPage'

import { ThemeProvider } from '@material-ui/core'

function App() {
  // FetchUser()
  // CreateUser();
  const theme = createTheme()
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

      <MainPage />
      <DisplayMapFC />
    </div>
  )
}

export default App
