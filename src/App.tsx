import React from 'react'

import './App.css'

import { CssBaseline } from '@material-ui/core'

import Footer from './containers/Footer'
import Header from './containers/Header'
import Router from './containers/Router'
import { createTheme } from './theme'

function App() {
  const theme = createTheme()
  return (
    <div className="App">
      <CssBaseline />
      <Header />
      <Router />
      <Footer />
    </div>
  )
}

export default App
