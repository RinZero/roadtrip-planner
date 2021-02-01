import React from 'react'

import './App.css'

import { CssBaseline } from '@material-ui/core'

import Router from './containers/Router'
import { createTheme } from './theme'

function App() {
  const theme = createTheme()
  return (
    <div className="App">
      <CssBaseline />
      <Router />
    </div>
  )
}

export default App
