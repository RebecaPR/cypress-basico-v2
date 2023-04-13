Cypress.Commands.add('preenchedorFormulario', function (){

   cy.get('#firstName').type('Rebeca')
   cy.get('#lastName').type('Ponciano')
   cy.get('#email').type('rebeca@gmail.com')
   cy.get('#open-text-area').type('Teste')

   cy.get('button[type="submit"]').click()

})
