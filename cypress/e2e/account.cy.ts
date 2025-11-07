describe('Account page flows', () => {
  beforeEach(() => {
    // stub user in localStorage
    cy.visit('/account', {
      onBeforeLoad(win) {
        win.localStorage.setItem('if_user', JSON.stringify({ id: 'user-1', email: 'test@example.com' }))
      }
    })
  })

  it('shows transactions and can open a transaction modal and flag/resolve', () => {
    // stub transactions list
    cy.intercept('GET', '/api/v1/admin/transactions*', {
      statusCode: 200,
      body: { data: [
        { id: 'tx-1', created_at: new Date().toISOString(), type: 'deposit', channel: 'mobile_money', amount: 50, status: 'completed', reference: 'REF1' }
      ], meta: { total: 1, last_page: 1 } }
    }).as('getTx')

    cy.visit('/account')
    cy.wait('@getTx')

    cy.contains('Recent activity')
    cy.get('table tbody tr').first().click()

    // stub flag request
    cy.intercept('POST', '/api/v1/admin/transactions/tx-1/flag', { statusCode: 200, body: { success: true } }).as('flag')
    cy.contains('Flag').click()
    cy.wait('@flag')

    // stub resolve
    cy.intercept('POST', '/api/v1/admin/transactions/tx-1/resolve', { statusCode: 200, body: { success: true } }).as('resolve')
    cy.contains('Resolve').click()
    cy.wait('@resolve')
  })

  it('allows quick transfer form to create a transaction', () => {
    cy.intercept('POST', '/api/v1/admin/transactions', (req) => {
      req.reply({ statusCode: 201, body: { id: 'tx-new', created_at: new Date().toISOString(), type: 'deposit', channel: req.body.channel, amount: req.body.amount, status: 'pending', reference: req.body.reference } })
    }).as('createTx')

    // open transfer UI
    cy.contains('Transfer').click()
    cy.get('input[type="number"]').clear().type('120')
    // recipient input: it's the second required input on the form
    cy.get('input[required]').eq(1).clear().type('0540000000')
    cy.contains('Send').click()
    cy.wait('@createTx')
    cy.contains('Transfer queued')
  })

  it('exports statement by calling transactions endpoint', () => {
    // when backend returns transactions the client will build a CSV and trigger a download
    cy.intercept('GET', '/api/v1/admin/transactions*', { statusCode: 200, body: { data: [ { id: 'tx-1', created_at: new Date().toISOString(), reference: 'REF1', type: 'deposit', channel: 'mobile_money', amount: 10, status: 'completed', notes: '' } ], meta: { total: 1, last_page: 1 } } }).as('exportTx')

    // spy on URL.createObjectURL so we can assert a download blob was created
    cy.window().then((win) => {
      cy.stub(win.URL, 'createObjectURL').as('createObj')
    })

    cy.contains('Download statement').click()
    cy.wait('@exportTx')
    cy.get('@createObj').should('have.been.called')
  })

  it('rejects invalid quick transfer (amount 0) and does not call create endpoint', () => {
    cy.intercept('POST', '/api/v1/admin/transactions', { statusCode: 500 }).as('createTx')
    cy.contains('Transfer').click()
    // enter invalid amount (below min)
    cy.get('input[type="number"]').clear().type('0')
    cy.get('input[required]').eq(1).clear().type('0540000000')
    cy.contains('Send').click()
    // ensure backend was not called (browser validation should prevent submit)
    cy.wait(500)
    cy.get('@createTx.all').should('have.length', 0)
  })

  it('shows error toast when flag endpoint returns 400', () => {
    cy.intercept('GET', '/api/v1/admin/transactions*', {
      statusCode: 200,
      body: { data: [ { id: 'tx-err', created_at: new Date().toISOString(), type: 'deposit', channel: 'mobile_money', amount: 50, status: 'completed', reference: 'REFERR' } ], meta: { total: 1, last_page: 1 } }
    }).as('getTxErr')

    cy.visit('/account')
    cy.wait('@getTxErr')
    cy.get('table tbody tr').first().click()

    cy.intercept('POST', '/api/v1/admin/transactions/tx-err/flag', { statusCode: 400, body: { error: 'Already flagged' } }).as('flagErr')
    cy.contains('Flag').click()
    cy.wait('@flagErr')
    cy.contains('Failed to flag').should('exist')
  })
})
