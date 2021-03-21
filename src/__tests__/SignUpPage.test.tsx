import React from 'react'

import { render, screen } from '@testing-library/react'
import { shallow, mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'

import SignUpPage from '../containers/SignUpPage'
import store from '../store'

configure({ adapter: new Adapter() })

it('renders without crashing', () => {
  render(
    <Provider store={store}>
      <SignUpPage />
    </Provider>
  )
})
