/// <reference types="cypress" />

it('google test', function() {
    cy.visit("https://google.com")
    cy.get('.gLFyf').type('Automation Step by Step{enter}')

    cy.contains('Videos').click()

} )

it.only('login test', function(){
    cy.visit('https://opensource-demo.orangehrmlive.com/')
    cy.get('#txtUsername').type('Admin')
    cy.get('#txtPassword').type('admin123{enter}')
    cy.get('#menu_admin_viewAdminModule > b').click()
    cy.get('#menu_admin_viewSystemUsers').invoke('show').click()
})