

describe('Central de Atendimento ao Cliente TAT', function (){

   beforeEach(function(){

      cy.visit('./src/index.html')

   })

it('verificar o titulo da aplicação', function(){

   cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
})

it('preenche campos obrigatorios', function(){

   const longText = 'teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste '

   cy.get('#firstName').type('Rebeca')
   cy.get('#lastName').type('Ponciano')
   cy.get('#email').type('rebeca@gmail.com')
   cy.get('#open-text-area').type(longText)

   cy.get('button[type="submit"]').click()

   cy.get('.success').should('be.visible')
   

})

it('mensagem de erro com email incorreto', function(){

   cy.get('#firstName').type('Rebeca')
   cy.get('#lastName').type('Ponciano')
   cy.get('#email').type('rebeca@gmail,com')
   cy.get('#open-text-area').type('teste')

   cy.get('button[type="submit"]').click()

   cy.get('.error').should('be.visible')
})

it('campo telefone continua vazio quando preenchido com valor nao numerico', function(){
  
   cy.get('#phone')
   .type('abcdefghij')
   .should('have.value','')
})

it('mensagem de erro quando o telefone se torna obigatorio mas não é preenchido antes de enviar', function(){

   cy.get('#firstName').type('Rebeca')
   cy.get('#lastName').type('Ponciano')
   cy.get('#email').type('rebeca@gmail.com')
   cy.get('#phone-checkbox').click()
   cy.get('#open-text-area').type('teste')

   cy.get('button[type="submit"]').click()

   cy.get('.error').should('be.visible')

})

it('preenche e limpa os campos, nome, sobrenome, email e telefone', function(){

   cy.get('#firstName').type('Rebeca')
   .should('have.value','Rebeca')
   .clear()
   .should('have.value','')

   cy.get('#lastName').type('Ponciano')
   .should('have.value','Ponciano')
   .clear()
   .should('have.value','')

   cy.get('#email').type('rebeca@gmail.com')
   .should('have.value','rebeca@gmail.com')
   .clear()
   .should('have.value','')

   cy.get('#phone').type('25790753')
   .should('have.value','25790753')
   .clear()
   .should('have.value','')

   cy.get('#open-text-area').type('teste')
   .should('have.value','teste')
   .clear()
   .should('have.value','')

})

it('exibe mensagem de erro ao submeter o formulario sem preencher os campos obrigatorios', function(){

   cy.get('button[type="submit"]').click()
   cy.get('.error').should('be.visible')

})

//COMANDOS COSTUMIZADOS

it('envia formulario com sucesso usando comando costumizado', function(){

cy.preenchedorFormulario()

cy.get('.success').should('be.visible')

})

// UTILIZANDO CONTAINS AO INVES DE GET

it('usando contains', function(){

   cy.get('#firstName').type('Rebeca')
   cy.get('#lastName').type('Ponciano')
   cy.get('#email').type('rebeca@gmail.com')
   cy.get('#open-text-area').type('teste')

   cy.contains('button', 'Enviar').click()

   cy.get('.success').should('be.visible')
   

})

// SELECIONANDO CAMPOS DE SELAÇÃO SUSPENSA//

// SELECIONANDO PELO TEXO//

it('selciona um produto (youtube) por seu texto', function(){
   cy.get('#product').select('YouTube').should('have.value','youtube')

})
// SELECIONANDO O PRODUTO PELO VALOR//

it('selecione o produto (mentoria) pelo seu valor (value)', function(){
   cy.get('#product').select('mentoria').should('have.value','mentoria')
})

// SELECIONANDO O PRODUTO PEO INDICE//

it('seleciona o produto (blog) pelo indice',function(){
   cy.get('#product').select(1).should('have.value','blog')
})

//MARCANDO INPUTS DO TIPO RADIO//

it('marca o tipo de teandimento feedack', function(){
   cy.get('input[type="radio"][value="feedback"]').check().should('have.value','feedback')
})

//MARCAR CADA TIPO DE ATENDIMENTO//

it('marca cada tipo de atendimento', function(){
   cy.get('input[type="radio"]')
   .should('have.length',3)
   .each(function ($radio) {   //PASSA POR CADA ELEMENTO//
      cy.wrap($radio).check()  //EMPACOTAR//
      cy.wrap($radio).should('be.checked')
   })
})

//MARCAR E DESMARACAR CHECKBOX//

it('marca ambos checkbox depois desmarca o ultimo', function(){
   cy.get('input[type="checkbox"]')
   .check()
   .should('be.checked')
   .last()
   .uncheck()   //TB SERVE PARA O INPUT//
   .should('not.be.checked')
})

// UPLOAD DE ARQUIVOS COM CYPRESS//

it('selecione um aqurquivo da pasta fixtures',function(){
   cy.get('#file-upload')
   .should('not.have.value')
   .selectFile('./cypress/fixtures/example.json')
   .should(function($input){
      expect($input[0].files[0].name).to.equal('example.json')

   })
})

// SIMULANDO QUE ESTÁ ARRASTANDO UM ARQUIVO PARA DENTRO DO INPUT PARA FAZER UPLOAD//
it('seleciona um arquivo simulando um drag-and-drop', function(){
   cy.get('#file-upload')
   .should('not.have.value')
   .selectFile('./cypress/fixtures/example.json',{action:'drag-drop'})
   .should(function($input){
      expect($input[0].files[0].name).to.equal('example.json')

   })
})

// FIXTURE FOI DADO UM ALIAS//

it('selecione um arq utilizando uma fixture p qual foi dado um alias', function(){
   cy.fixture('example.json').as('sampleFile')
   cy.get('input[type="file"]')
   .selectFile('@sampleFile')
   .should(function($input){
   expect($input[0].files[0].name).to.equal('example.json')
})
})

//LINKS QUE ABREM EM OUTRA ABA//

   it('politica de privacidade abre em outra aba sem pre4cisar de click',function(){
      cy.get('#privacy a').should('have.attr','target','_blank') //comportamento padrão que abre em outra aba//
   })

   // REMOVENDO O TARGET //

it('acessa politica de privacidade removendoo target e então clicando no link', function(){
   cy.get('#privacy a')
   .invoke('removeAttr','target') // como se tivesse rodando na mesma aba, pq o cypress não reconhece a outra aba, agora da pra testar a aba 'nova"
   .click()

   cy.contains('Talking About Testing').should('be.visible')
})





})