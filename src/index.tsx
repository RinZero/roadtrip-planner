import React from 'react'

import ReactDOM from 'react-dom'

import './index.css'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { ConnectedRouter } from 'connected-react-router'

import App from './App'
import reportWebVitals from './reportWebVitals'
import store, { history } from './store'
import { createTheme } from './theme'

const theme = createTheme()
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
