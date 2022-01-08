/// <reference types="cypress" />

describe('t9 app', () => {
    beforeEach(() => {
      cy.visit('/', {
        auth: {
            username: 't9user',
            password: 'SdQ42CnujduGrrMv',
          },
      })
    })
  
    it('basic render', () => {
     cy.get('[data-test=heading]').should("have.text", "T9 keyboard")
     cy.get('[data-test=inputField').should("have.value", "");
     cy.get('[data-test=inputField').should("have.attr", "readonly");
     cy.get('[data-test=dictSwitch').should("have.attr", "checked");
     cy.get('[data-test=phoneButton-1').should("have.text", "1");
     cy.get('[data-test=phoneButton-2').should("have.text", "2abc");
     cy.get('[data-test=phoneButton-3').should("have.text", "3def");
     cy.get('[data-test=phoneButton-4').should("have.text", "4ghi");
     cy.get('[data-test=phoneButton-5').should("have.text", "5jkl");
     cy.get('[data-test=phoneButton-6').should("have.text", "6mno");
     cy.get('[data-test=phoneButton-7').should("have.text", "7pqrs");
     cy.get('[data-test=phoneButton-8').should("have.text", "8tuv");
     cy.get('[data-test=phoneButton-9').should("have.text", "9wxyz");
     cy.get('[data-test="phoneButton-*"').should("have.text", "*");
     cy.get('[data-test=phoneButton-0').should("have.text", "0");
     cy.get('[data-test="phoneButton-#"').should("have.text", "#");
     cy.get('[data-test=wordChoiceList').children().should("have.length", 0)
     cy.get('[data-test^=wordChoice-]').should("not.exist");
    })

    it('one letter word no dictionary', () => {
      cy.get('[data-test=dictSwitch]').click({force: true})
      cy.clickNumbers("2")
      cy.get('[data-test=inputField').should("have.value", "a");
      cy.checkWordList(["a", "b", "c"], {exact: true})
    })

    it('two letter word no dictionary', () => {
      cy.get('[data-test=dictSwitch]').click({force: true})
      cy.clickNumbers("23")
      cy.get('[data-test=inputField').should("have.value", "ad");
      cy.checkWordList(["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"], {exact: true})
    })

    it('longer words with dictionary - the/tie', () => {
      cy.clickNumbers("843")
      cy.checkWordList(["the", "tie"], {exact: false})
    })

    it('longer words with dictionary - home/gone/good/hood', () => {
      cy.clickNumbers("4663")
      cy.checkWordList(["home", "gone", "good", "hood"], {exact: false})
    })

    it('longer words with dictionary - elephant', () => {
      cy.clickNumbers("35374268")
      cy.checkWordList(["elephant"], {exact: false})
    })

    it("deleting characters", () => {
      cy.clickNumbers("23")
      cy.get('[data-test=inputField').should("have.value", "ad");
      cy.checkWordList(["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"], {exact: true})
      
      cy.get("[data-test=deleteButton]").click()
      cy.get('[data-test=inputField').should("have.value", "a");
      cy.checkWordList(["a", "b", "c"], {exact: true})

      cy.get("[data-test=deleteButton]").click()
      cy.get('[data-test=inputField').should("have.value", "");
      cy.checkWordList([], {exact: true})
    })

    it("adding numbers when there are no words", () => {
      cy.clickNumbers("2222")
      cy.checkWordList(["abba"], {exact: false})

      cy.clickNumbers("2")
      cy.get('[data-test=inputField').should("contain.value", "2");
      cy.checkWordList([], {exact: true})

      cy.clickNumbers("5")
      cy.get('[data-test=inputField').should("contain.value", "25");
      cy.checkWordList([], {exact: true})

      cy.get("[data-test=deleteButton]").click()
      cy.get('[data-test=inputField').should("contain.value", "2");
      cy.get('[data-test=inputField').should("not.contain.value", "5");
      
      cy.get("[data-test=deleteButton]").click()
      cy.get('[data-test=inputField').should("not.contain.value", "2");
      cy.checkWordList(["abba"], {exact: false})
    })

    it("switching dictionary usage when typing", () => {
      cy.get('[data-test=dictSwitch]').click({force: true})
      cy.clickNumbers("4663")
      cy.get('[data-test=wordChoiceList').children().should("have.length", 81)

      cy.get('[data-test=dictSwitch]').click({force: true})
      cy.checkWordList(["home", "gone", "good", "hood"], {exact: true})

      cy.get('[data-test=dictSwitch]').click({force: true})
      cy.get('[data-test=wordChoiceList').children().should("have.length", 81)
      
      for (let i = 0; i < 4; i++) {
        cy.get("[data-test=deleteButton]").click()        
      }
      cy.get('[data-test=inputField').should("have.value", "");
      cy.checkWordList([], {exact: true})
    })
  })
  