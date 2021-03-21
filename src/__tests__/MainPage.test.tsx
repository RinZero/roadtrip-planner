import React from 'react'

import { render, screen } from '@testing-library/react'
import { shallow, mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'

import MainPage from '../containers/MainPage'
import store from '../store'

configure({ adapter: new Adapter() })

it('renders without crashing', () => {
  render(
    <Provider store={store}>
      <MainPage />
    </Provider>
  )
})
/*
it('renders Text', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <MainPage />
    </Provider>
  )
  const text = <h1>Roads were made for journeys, not destinations</h1>
  expect(wrapper.contains(text)).toEqual(true)
})
*/
