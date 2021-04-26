describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })
})

describe('My Second Test', () => {
  it('Visits the Main Page', () => {
    cy.visit('http://localhost:3000') //wenn Backend läuft 3001
  })
})
describe('My third Test', () => {
  it('should not be able to login with empty data', () => {
    cy.visit('/')

    cy.findByText('LogIn').click()
    cy.findByRole('button').click()

    cy.findByText('SignUp').should('exist')
    cy.findByText('Hallo').should('not.exist')
  })
})
