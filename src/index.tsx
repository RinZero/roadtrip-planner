import React from 'react'

import { MuiThemeProvider } from '@material-ui/core'
import { ConnectedRouter } from 'connected-react-router'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import App from './App'
import logo from './assets/animation/roadabout.webm'
import reportWebVitals from './reportWebVitals'
import store, { history, persistor } from './store'
import { createTheme } from './theme'

const theme = createTheme()
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <PersistGate
          loading={
            <video autoPlay loop>
              <source src={logo} type="video/mp4"></source>
            </video>
          }
          persistor={persistor}
        >
          <App />
        </PersistGate>
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
