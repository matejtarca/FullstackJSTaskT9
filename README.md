# T9 Keyboard

This project implements basic [T9 (predictive text)](https://en.wikipedia.org/wiki/T9_(predictive_text)) technology used in mobile phones with 3x4 numeric keypad. It combines front-end web application written in **React** with REST API written in **Node.js** + **Express**

---

## Deployment
Front-end of this project is deployed at https://t9.matejtarca.sk *(Authentication for the website will be provided when needed)*  
API is running at https://t9api.matejtarca.sk

---

## t9api

### Technologies
**REST API:** Node.js, Express  
**Testing:** Mocha, Chai  

### Endpoints
**/parseNumbers**
- **Method:** `POST`
- **Params:**
    - `numbers[string]` - specifies the string of numbers to be converted to list of possible words
    - `useDict[boolean]` - specifies usage of dictionary when producing the input. When `true` only words present in the dictionry will be in output. The dictionary consists of 20,000 most common english words.
- **Success response** 
    - Code: 200
    - `{ words : [<array of possible words>] }`
- **Sample axios call**
```js
axios.post("{API_URL}/parseNumbers", {
    numbers: "23",
    useDict: false
})
.then((res) => {
    const words = res.data.words // ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]
}
```

### Running locally
To run locally create `.env` file in the `t9api/` directory and specify port for the api to run at. Example of .env file:
```
PORT=3000
```
To first start the API run these commands in the `t9api/` directory
```bash
npm install
npm start
```
### Running tests locally
To run unit tests use the `npm test` command  

## t9ui

### Technologies
**Web app**: React, Orbit-components library  
**Testing**: Jest, React Testing Library

### Running locally
To first start the WebApp run these commands in the `t9ui/` directory
```bash
npm install
npm start
```
### Running tests locally
To run unit tests use the `npm test` command

## t9tests
### Technologies
**Testing**: Cypress.io

This part of project contains `cypress` e2e integration tests for the app.
### Running tests locally
To run e2e tests locally make sure you have installed cypress correctly (it may take a while) and then run
```bash
npm install
npm run cypress run
```
Top open interactive cypress window use `npm run cypress open`

---
*This project was created as part of interview process*

