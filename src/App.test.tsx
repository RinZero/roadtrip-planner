import React from 'react'

import App from './App'
import { render, screen } from './test-utils'

it('renders welcome message', () => {
  render(<App />)
  expect(
    screen.getByText('"Roads were made for journeys, not destinations"')
  ).toBeInTheDocument()
})
