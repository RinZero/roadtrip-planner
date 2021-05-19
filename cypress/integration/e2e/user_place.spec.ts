describe('create, edit and delete own Places as User', () => {
  //   *********** Login, click on Link in Header and render New Place Page ***********
  it('Login and visit Neuer Ort Page', () => {
    cy.visit('/')

    cy.findByText('LogIn').click()
    cy.findByRole('button').click()

    cy.get('input[name="email"]').type('test1@user.at')
    cy.get('input[name="password"]').type('test123')

    cy.findByRole('button', { name: 'LogIn' }).click()
    cy.findByText('SignUp', { timeout: 10000000000 }).should('not.exist')

    cy.findByText('Ort hinzufügen').click()

    cy.findByRole('button', { name: 'Neuen Ort erstellen' }).should('exist')
  })

  // *********** Fill in form, submit and check if it worked and check if new place is in profile ***********
  it('Fill in form', () => {
    cy.findByLabelText('Name').type('Lieblingsplatz')
    cy.findByLabelText('Beschreibung').type('ruhig und schöne Aussicht')
    cy.findByLabelText('Kategorien').type('Aussichtsp')
    cy.findByText('Aussichtspunkt', { timeout: 10000 }).click()
  })

  it('submit and check if it worked', () => {
    // Submit
    cy.findByRole('button', {
      name: 'Neuen Ort erstellen',
      timeout: 2500,
    }).click()
    cy.findByText('Dein neuer Ort wurde erstellt!', { timeout: 10000 }).should(
      'exist'
    )
  })

  it('check if new place is in profile', () => {
    cy.wait(10000)
    cy.location('pathname').should('eq', '/profile')
    cy.get('.MuiListItem-root', { timeout: 10000 }).should('be.visible')
    cy.get('.MuiListItem-root', { timeout: 10000 })
      .last()
      .findByText('Lieblingsplatz', { timeout: 10000 })
      .should('exist')
  })

  // *********** Click edit button and edit Place, check in profile if it worked ***********
  it('Click edit button and redirect to New Place Page', () => {
    // find newest place and click edit button
    cy.get('.MuiListItem-root', { timeout: 10000 })
      .last()
      .find('svg', { timeout: 10000 })
      .eq(0)
      .click()

    cy.findByRole('button', { name: 'Ort bearbeiten', timeout: 10000 }).should(
      'exist'
    )
  })
  it('Edit Place', () => {
    cy.findByLabelText('Name').clear().type('Mein Lieblingsplatz')
    // Submit
    cy.findByRole('button', { name: 'Ort bearbeiten', timeout: 10000 }).click()
    cy.findByText('Dein Ort wurde bearbeitet!', { timeout: 10000 }).should(
      'exist'
    )
  })
  it('Check in profile if edit worked', () => {
    // cy.get(`[aria-label="profile"]`).click()
    cy.location('pathname').should('eq', '/profile', { timeout: 10000 })
    cy.findByText('Mein Lieblingsplatz', { timeout: 10000 }).should('exist')
  })

  // *********** Click delete, check if it worked ***********
  it('Delete created place and check if it worked', () => {
    // find newest place and click delete button
    cy.get('.MuiListItem-root', { timeout: 10000 }).should('be.visible')
    cy.get('.MuiListItem-root', { timeout: 10000 })
      .last()
      .find('svg', { timeout: 10000 })
      .eq(1)
      .click()
    cy.findByRole('button', { name: 'Löschen' }).click()
    cy.findByText('Mein Lieblingsplatz').should('not.exist')
    cy.findByText('Dein Ort wurde gelöscht', { timeout: 10000 }).should('exist')
  })
})
