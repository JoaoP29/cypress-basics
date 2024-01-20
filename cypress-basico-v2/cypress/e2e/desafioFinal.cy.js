it('encontra o gatinho escondido', () => {
    cy.visit('./src/index.html')
    cy.get('#cat')
    .invoke('show')
    .should('be.visible')

    cy.get('#title')
    .invoke('text', 'CAT TAT')

    cy.get('#subtitle')
    .invoke('text', 'EU ❤️ GATINHOS!!!')
})