describe('Edit User Test', () => {
  it('login and check profile', () => {
    cy.visit('http://localhost:3001') //wenn Backend läuft 3001
    cy.findByText('LogIn').click()

    cy.get('input[name="email"]').type('edit@old.at')
    cy.get('input[name="password"]').type('edit12345')
    cy.findByRole('button', { name: 'LogIn' }).click()

    cy.findByLabelText('profile').click()
    cy.findByText('Meine Roadtrips:').should('exist')
    cy.findByText('edit@old.at').should('exist')
  })

  it('change name, email and add picture', () => {
    cy.findByText('edit@old.at').should('exist')

    cy.get(`[aria-label="edit"]`).click()
    cy.get('input[name="userName"]').clear().type('NewEditName')
    cy.get('input[name="email"]').clear().type('new_edit@email.at')
    cy.get('input[name="password"]').type('edit12345')
    cy.get('input[name="password_confirmation"]').type('edit12345')
    cy.get('input[name="picture"]').clear().type('https://img.jpg')
    cy.findByRole('button', { name: 'Speichern' }).click()

    cy.findByText('NewEditName').should('exist')
    cy.findByText('new_edit@email.at').should('exist')
    cy.findByAltText('Profilbild').should('have.attr', 'src', 'https://img.jpg')
  })

  it('deletes user', () => {
    cy.findByText('new_edit@email.at').should('exist')

    cy.get(`[aria-label="edit"]`).click()
    cy.findByText('Profil löschen').click()
    cy.findByText('Löschen').click()

    cy.findByText('SignUp').should('exist')
  })
})
