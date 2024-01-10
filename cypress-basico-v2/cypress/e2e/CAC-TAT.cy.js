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

    cy.contains('.button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })

  it('Verifica mensagem de erro ao submeter respostas com e-mail em formatação errada', () => {
    cy.get('#firstName').type('Augusto')
    cy.get('#lastName').type('dos Anjos')
    cy.get('#email').type('augusto@aug')
    cy.get('#open-text-area').type('LongText delay: 0')

    cy.contains('.button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('Verificar se o campo telefone continua vazio após o usuário digitar letras', () => {
    cy.get('#phone').type('abcdefghij').should('have.value', '')
  })

  it('verificar se mensagem de erro é exibida quando o campo de telefone é obrigatório, mas não é preenchido', () => {
    cy.get('#firstName').type('Augusto')
    cy.get('#lastName').type('dos Anjos')
    cy.get('#email').type('augusto@aug')
    cy.get('#open-text-area').type('LongText delay: 0')
    cy.get('#phone-checkbox').click()

    cy.contains('.button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('Augusto').should('have.value', 'Augusto').clear().should('have.value', '')
    cy.get('#lastName').type('dos Anjos').should('have.value', 'dos Anjos').clear().should('have.value', '')
    cy.get('#email').type('augusto@aug.au').should('have.value', 'augusto@aug.au').clear().should('have.value', '')
    cy.get('#phone').type('40028922').should('have.value', '40028922').clear().should('have.value', '')
    cy.get('#open-text-area').type('LongText delay: 0').should('have.value', 'LongText delay: 0').clear().should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('.button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (Youtube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1).should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
  })
  
  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
    .should('have.length', 3)
    .each(($radio) => {
      cy.wrap($radio).check()
      cy.wrap($radio).should('be.checked')
    })

    it.only('marca ambos checkboxes, depois desmarca o último', () => {
      cy.get('input[type="checkbox"]')
      .check()
      .last()
      .uncheck()
      .should('not.be.checked')
    })
  })

})
