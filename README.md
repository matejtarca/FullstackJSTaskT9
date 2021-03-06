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
**`/parseNumbers`**
- **Method:** `POST`
- **Params:**
    - `numbers[string]` - specifies the string of numbers to be converted to list of possible words
    - `useDict[boolean]` - specifies usage of dictionary when producing the input. When `true` only words present in the dictionary will be in the output. The dictionary consists of 20,000 most common english words.
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
To run the API locally create `.env` file in the `t9api/` directory and specify the port for the API to run at. Example of .env file:
```
PORT=3000
```
To start the API run these commands in the `t9api/` directory
```bash
npm install
npm start
```
### Running tests locally
To run the unit tests for the API use the `npm test` command  

## t9ui

### Technologies
**Web app**: React, Orbit-components library  
**Testing**: Jest, React Testing Library

### Running locally
To run the web app locally create `.env` file in the `t9ui/` directory and specify the url for the backend API. Example of .env file:
```
REACT_APP_API_URL=http://localhost:3000
```
To start the web app run these commands in the `t9ui/` directory
```bash
npm install
npm start
```
### Running tests locally
To run the unit tests for the React components use the `npm test` command

## t9tests
This part of the project contains cypress e2e integration tests for the app.
### Technologies
**Testing**: Cypress.io

### Running tests locally
To run the e2e tests locally make sure you have installed cypress correctly (it may take a while) and then run
```bash
npm install
npm run cypress run
```
To open the interactive cypress window use `npm run cypress open`

## Possible future improvements
- Connect all three groups of tests with CI/CD and Github Actions
- Implement new parameter for API to specify maximum number of generated words, and make the setting available in the UI
- Refactor the code to use TypeScript (especially API)

---
*This project was created as part of an interview process*

