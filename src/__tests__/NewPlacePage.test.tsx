import React from 'react'

import { render, screen } from '@testing-library/react'
import { shallow, mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'

import NewPlacePage from '../containers/NewPlacePage'
import store from '../store'

configure({ adapter: new Adapter() })

it('renders without crashing', () => {
  render(
    <Provider store={store}>
      <NewPlacePage />
    </Provider>
  )
})

it(' shallow renders without crashing', () => {
  shallow(
    <Provider store={store}>
      <NewPlacePage />
    </Provider>
  )
})
