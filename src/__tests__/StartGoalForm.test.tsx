import React from 'react'

import { render, screen } from '@testing-library/react'
import { shallow, mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'

import StartGoalForm from '../components/StartGoalForm'
import store from '../store'

configure({ adapter: new Adapter() })

it('renders without crashing', () => {
  render(
    <Provider store={store}>
      <StartGoalForm />
    </Provider>
  )
})

it(' shallow renders without crashing', () => {
  shallow(
    <Provider store={store}>
      <StartGoalForm />
    </Provider>
  )
})

/*
it(' accepts input', () => {
  const newValue = 'Salzburg'
  const wrapper = mount(
    <Provider store={store}>
      <StartGoalForm />
    </Provider>
  )
  const input = wrapper.find('#stops[0]')
  input.simulate('change', { target: { value: newValue } })
  expect(wrapper.state()).toEqual(newValue)
})
*/
