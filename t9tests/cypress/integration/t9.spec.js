/// <reference types="cypress" />

describe('t9 app', () => {
    beforeEach(() => {
      cy.visit('https://t9.matejtarca.sk', {
        auth: {
            username: 't9user',
            password: 'SdQ42CnujduGrrMv',
          },
      })
    })
  
    it('basic render', () => {
     
    })
  })
  