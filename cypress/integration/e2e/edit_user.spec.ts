describe('Edit User Test', () => {
  it('login', () => {
    cy.visit('/') //wenn Backend läuft 3001
    cy.findByText('LogIn').click()

    cy.get('input[name="email"]').type('edit@old.at')
    cy.get('input[name="password"]').type('@Edit12345')
    cy.findByRole('button', { name: 'LogIn' }).click()
    cy.findByText('SignUp', { timeout: 10000000000 }).should('not.exist')
  })

  it('check profile', () => {
    cy.get(`[aria-label="profile"]`).click()
    cy.findByText('Meine Roadtrips:').should('exist')
    cy.findByText('edit@old.at').should('exist')
  })

  it('change name and email', () => {
    cy.findByText('edit@old.at').should('exist')

    cy.get(`[aria-label="Profil bearbeiten"]`).click()
    cy.get('input[name="userName"]').clear().type('NewEditName')
    cy.get('input[name="email"]').clear().type('new_edit@email.at')
    cy.findByRole('button', { name: 'Speichern' }).click()

    cy.findByText('NewEditName').should('exist')
    cy.findByText('new_edit@email.at').should('exist')
  })

  it('deletes user', () => {
    cy.findByText('new_edit@email.at').should('exist')

    cy.get(`[aria-label="Profil bearbeiten"]`, { timeout: 15000 }).click()
    cy.findByText('Profil löschen').click()
    cy.findByText('Löschen').click()

    cy.findByText('SignUp').should('exist')
  })
})
