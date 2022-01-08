Cypress.Commands.add('clickNumbers', (numbers) => {
    Array.from(numbers).map((number) => {
        cy.get(`[data-test=phoneButton-${number}]`).click()
    })
})

Cypress.Commands.add('checkWordList', (words, config = {exact: false}) => {
    if (config.exact) {
        cy.get('[data-test=wordChoiceList').children().should("have.length", words.length)
    }
    words.map((word) => {
        cy.get(`[data-test="wordChoice-${word}"]`).should("have.text", word)
    })
})
