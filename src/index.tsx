import React from 'react'

import ReactDOM from 'react-dom'

import './index.css'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import App from './App'
import reportWebVitals from './reportWebVitals'
import store from './store'
import { createTheme } from './theme'

const theme = createTheme()
ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
