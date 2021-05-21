import { eq } from 'cypress/types/lodash'

describe('Manage Roadtrips E2E', () => {
  it('should not be able to login with empty data', () => {
    cy.visit('/')

    cy.findByText('LogIn').click()

    cy.findByRole('button').click()

    cy.findByText('SignUp').should('exist')
    cy.findByText('Hallo').should('not.exist')
  })
  it('should be able to login with correct data', () => {
    cy.visit('/')

    cy.findByText('LogIn').click()

    cy.get('input[name="email"]').type('some@email.to')
    cy.get('input[name="password"]').type('P@ssw0rd')
    cy.findByRole('button').click()

    cy.findByText('SignUp', { timeout: 10000000000 }).should('not.exist')
    cy.findByRole('link', { name: 'Ort hinzufügen' }).should('exist')
  })
  it('profile has the right data', () => {
    cy.get(`[aria-label="profile"]`).click()

    cy.findByText('Meine Roadtrips', { exact: false }).should('exist')

    cy.findByText('testingtrip').should('exist')
    cy.findByText('3 Stops').should('exist')
    cy.findByText('10 Stops').should('not.exist')
  })
  it('roadtrips are displayed with correct information', () => {
    cy.findByText('Meine Roadtrips', { exact: false }).should('exist')

    cy.findByText('testingtrip').should('exist')
    cy.findByText('3 Stops').should('exist')
    cy.findByText('10 Stops').should('not.exist')
  })
  it('switch to Edit Roadtrip works', () => {
    cy.findAllByRole('button', {
      name: 'Roadtrip Bild testingtrip 3 Stops',
    }).click()
    cy.findAllByText('Roadtrip-Name').eq(0).should('exist')
    cy.findByRole('textbox').should('have.value', 'testingtrip')
    cy.findByText('stop1').should('exist')
  })
  it('updates Roadtrip correct', () => {
    cy.findAllByRole('button').eq(4).click() //found via trial and error, can't acces in another way, because of material ui
    cy.findByText('stop1').should('not.exist')
    cy.findByText('stop2').should('exist')
    cy.findByText('stop3').should('exist')

    cy.findByRole('textbox').clear().type('Changed^^^^')
    cy.findByRole('button', { name: 'Roadtrip bearbeiten' }).click()

    cy.findByText('Meine Roadtrips', { exact: false }).should('exist')
    cy.findByText('Changed^^^^').should('exist')
    cy.findByText('2 Stops').should('exist')
    cy.findByText('3 Stops').should('not.exist')
  })

  it('delete Roadtrip works', () => {
    cy.findAllByRole('button', { name: 'Roadtrip löschen' }).click()
    cy.findAllByRole('button', { name: 'Löschen' }).click()
    cy.findByText('Changed^^^^').should('not.exist')
  })
})
