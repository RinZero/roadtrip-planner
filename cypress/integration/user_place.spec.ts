describe('create, edit and delete own Places as User', () => {
  //   *********** Login, click on Link in Header and render New Place Page ***********
  it('Login and visit Neuer Ort Page', () => {
    cy.visit('/')

    cy.findByText('LogIn').click()
    cy.findByRole('button').click()

    cy.get('input[name="email"]').type('maria@maria.at')
    cy.get('input[name="password"]').type('maria123')

    cy.findByRole('button', { name: 'LogIn' }).click()
    cy.findByText('SignUp', { timeout: 10000000000 }).should('not.exist')

    cy.findByText('Ort hinzufügen').click()

    cy.findByRole('button', { name: 'Neuen Ort erstellen' }).should('exist')
  })

  // *********** Fill in form, submit and check if it worked and check if new place is in profile ***********
  it('Fill in form', () => {
    cy.findByLabelText('Name').type('Lieblingsplatz')
    cy.findByLabelText('Beschreibung').type('ruhig und schöne Aussicht')
    cy.findByLabelText('Breitengrad').type(47)
    cy.findByLabelText('Längengrad').type(12)
    cy.findByLabelText('Kategorien').type('Aussichtspunkt')
    cy.findByText('Aussichtspunkt').click()
  })

  it('submit and check if it worked', () => {
    // Submit
    cy.findByRole('button', { name: 'Neuen Ort erstellen' }).click()
    cy.findByText('Deine neue Location wurde erstellt!').should('exist')
  })

  it('check if new place is in profile', () => {
    cy.get(`[aria-label="profile"]`).click()
    cy.findByText('Lieblingsplatz').should('exist')
  })

  // *********** Click edit button and edit Place, check in profile if it worked ***********
  it('Click edit button and redirect to New Place Page', () => {
    // find newest place and click edit button
    cy.get('.MuiListItem-root').last().find('svg').eq(0).click()

    cy.findByRole('button', { name: 'Neuen Ort erstellen' }).should('exist')
  })
  it('Edit Place', () => {
    cy.findByLabelText('Name').clear().type('Mein Lieblingsplatz')
    // Submit
    cy.findByRole('button', { name: 'Neuen Ort erstellen' }).click()
    cy.findByText('Deine neue Location wurde bearbeitet!').should('exist')
  })
  it('Check in profile if it worked', () => {
    cy.get(`[aria-label="profile"]`).click()
    cy.findByText('Mein Lieblingsplatz').should('exist')
  })

  // *********** Click delete, check if it worked ***********
  it('should not be able to login with empty data', () => {
    // find newest place and click delete button
    cy.get('.MuiListItem-root').last().find('svg').eq(1).click()
    cy.findByText('Mein Lieblingsplatz').should('not.exist')
  })
})
