import React from 'react'

import { MuiThemeProvider } from '@material-ui/core'
import { ConnectedRouter } from 'connected-react-router'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'

import App from './App'
import reportWebVitals from './reportWebVitals'
import store, { history } from './store'
import { createTheme } from './theme'

import { MuiThemeProvider } from '@material-ui/core'

const theme = createTheme()
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
