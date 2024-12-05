/* eslint-disable import/export */
import React, { FC, ReactElement } from 'react'

import { MuiThemeProvider } from '@material-ui/core'
import { render, RenderOptions } from '@testing-library/react'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'

import store, { history } from './store'
import { createTheme } from './theme'

const theme = createTheme()
const AllTheProviders: FC = ({ children }) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
      </ConnectedRouter>
    </Provider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render }
