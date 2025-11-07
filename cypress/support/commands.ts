// custom commands placeholder
Cypress.Commands.add('loginAsUser', () => {
  // set localStorage stub
  cy.window().then((win) => {
    win.localStorage.setItem('if_user', JSON.stringify({ id: 'user-1', email: 'test@example.com' }))
  })
})
