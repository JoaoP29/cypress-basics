it('testa a página da política de privacidade de forma independente', () => {
    cy.visit('./sc/privacy.html')

    cy.contains('Talkin About Testing')
    .should('be.visibile')
  })