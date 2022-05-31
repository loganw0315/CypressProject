import urlsJson from '../fixtures/urls.json'

describe('Kitchen Sink Testing', () => {
    // hook to navigate to home page and check url before each test
    beforeEach('navigate to main and verify url', () => {
        cy.visit(Cypress.config().baseUrl)
        cy.url().should('eq', Cypress.config().baseUrl)
        // cy.url().should('eq', urlsJson.main_url)
    })

    // test home page
    it('url test', { browser: 'chrome' }, () => {
        cy.visit(urlsJson.main_url)
        cy.url().should('eq', urlsJson.main_url)

        assert.equal(Cypress.isBrowser('chrome'), true)
    })

    // test querying section link and sublinks from home page
    it('querying section test', { browser: 'firefox' }, () => {
        cy.get(':nth-child(4) > .row > .col-xs-12 > .home-list > :nth-child(1) > :nth-child(1)').click()
        cy.url().should('eq', urlsJson.querying_url)

        // assert cy.get(), cy.contains(), .within(), cy.root() exist as links and they go to correct pages
        cy.get('#get > a').click()
        cy.url().should('eq', urlsJson.querying_get_url)
        cy.go('back')

        cy.get('#contains > a').click()
        cy.url().should('eq', urlsJson.querying_contains_url)
        cy.go('back')

        cy.get('#within > a').click()
        cy.url().should('eq', urlsJson.querying_within_url)
        cy.go('back')

        cy.get('#root > a').click()
        cy.url().should('eq', urlsJson.querying_root_url)
        cy.go('back')

        assert.equal(Cypress.isBrowser('firefox'), true)
    })

    // test window section link and then for unique links containing '()' on that page
    it('window section test', { browser: '!chrome' }, () => {
        cy.get('.home-list > :nth-child(4) > :nth-child(1)').click()
        cy.url().should('eq', urlsJson.window_url)

        let unique = 0
        let linkArray = []
        // try with reduce instead of each/array/unique
        // cy.get("a:contains('()')").each($a => {
        //     const message = $a.text()
        //     if (!linkArray.includes(message)) {
        //         linkArray.push(message)
        //         unique++
        //     }
        // }).then(() => {
        //     assert.equal(unique, 3)
        // })

        // assert.equal(Cypress.isBrowser('!chrome'), true)
        cy.get("a:contains('()')", {timeout:1000})
            .then($a => {
                const uniqueLinks = []
                $a.each((i) => {
                    if(!uniqueLinks.includes($a[i].pathname)){
                        uniqueLinks.push($a[i].pathname)
                    }
                })
                expect(uniqueLinks, 'has 3 links').to.have.length(3)
            })
    })

    // set cookie on homepage called 'token' and verify its creation, then clear cookie and verify deletion
    it('sets cookie then deletes', () => {
        cy.setCookie('token', 'extremely_useless_value')
        cy.getCookie('token').should('have.property', 'value', 'extremely_useless_value')

        cy.clearCookie('token')
        cy.getCookie('token').should('be.null')
    })
})