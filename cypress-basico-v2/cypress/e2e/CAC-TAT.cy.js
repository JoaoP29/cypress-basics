/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  const THREE_SECONDS_IN_MS = 3000

  beforeEach('Preparação para os testes', () => {
    cy.visit('./src/index.html')
  })
  
  it('Verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('Preenche os campos obrigatórios e clica no botão Enviar', () => {
    const LongText = "Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste"

    cy.clock()

    cy.get('#firstName').type('Augusto').should('have.value', 'Augusto')
    cy.get('#lastName').type('dos Anjos').should('have.value', 'dos Anjos')
    cy.get('#email').type('augusto@aug.au').should('have.value', 'augusto@aug.au')
    cy.get('#open-text-area').type(LongText, { delay: 0 }).should('have.value', LongText)

    cy.contains('.button', 'Enviar').click()
    cy.get('.success').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.success').should('not.be.visible')
  })

  it('Verifica mensagem de erro ao submeter respostas com e-mail em formatação errada', () => {
    cy.get('#firstName').type('Augusto')
    cy.get('#lastName').type('dos Anjos')
    cy.get('#email').type('augusto@aug')
    cy.get('#open-text-area').type('LongText delay: 0')

    cy.contains('.button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  Cypress._.times(3, () => {
    it('Verificar se o campo telefone continua vazio após o usuário digitar letras', () => {
      cy.get('#phone').type('abcdefghij').should('have.value', '')
    })
  })

  it('verificar se mensagem de erro é exibida quando o campo de telefone é obrigatório, mas não é preenchido', () => {
    cy.get('#firstName').type('Augusto')
    cy.get('#lastName').type('dos Anjos')
    cy.get('#email').type('augusto@aug')
    cy.get('#open-text-area').type('LongText delay: 0')
    cy.get('#phone-checkbox').check()

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

    cy.clock()

    cy.get('.success').should('be.visible')
  
    cy.tick(THREE_SECONDS_IN_MS)
  
    cy.get('.success').should('not.be.visible')
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
  })

  
  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
    .check()
    .last()
    .uncheck()
    .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]#file-upload')
    .should('not.have.value')
    .selectFile('cypress/fixtures/example.json')
    .should(($input) => {
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]#file-upload')
    .should('not.have.value')
    .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
    .should(($input) => {
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]#file-upload')
    .selectFile('@sampleFile')
    .should(($input) => {
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a')
    .invoke('removeAttr', 'target')
    .click()

    cy.contains('Talking About Testing')
    .should('be.visible')
  })

  it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('preenche a area de texto usando o comando invoke', () => {
    const longText = Cypress._.repeat('0123456789 ', 20)

    cy.get('#open-text-area')
    .invoke('val', longText)
    .should('have.value', longText)
  })

  it('faz uma requisição HTTP', () => {
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
    .should((response) => {
      const { status, statusText, body } = response
      expect(status).to.equal(200)
      expect(statusText).to.equal('OK')
      expect(body).to.include('CAC TAT')
    })
  })
})
