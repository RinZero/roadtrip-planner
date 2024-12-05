import React from 'react'

import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import MainPage from '../containers/MainPage'
import store from '../store'

it('renders without crashing', () => {
  render(
    <Provider store={store}>
      <MainPage />
    </Provider>
  )
})
