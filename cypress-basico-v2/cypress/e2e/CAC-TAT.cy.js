/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach('Preparação para os testes', () => {
    cy.visit('./src/index.html')
  })
  
  it('Verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('Preenche os campos obrigatórios e clica no botão Enviar', () => {
    const LongText = "Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste"
    cy.get('#firstName').type('Augusto').should('have.value', 'Augusto')
    cy.get('#lastName').type('dos Anjos').should('have.value', 'dos Anjos')
    cy.get('#email').type('augusto@aug.au').should('have.value', 'augusto@aug.au')
    cy.get('#open-text-area').type(LongText, { delay: 0 }).should('have.value', LongText)

    cy.get('.button').click()
    cy.get('.success').should('be.visible')
  })
})
