var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors')

// CONFIGURE API
require('dotenv').config()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// SET PORT
var port = process.env.PORT || 3000;

// REGISTER ROUTES
const parseNumbersRoute = require('./routes/parseNumbers')
app.use('/', parseNumbersRoute)

// START THE SERVER
app.listen(port);
console.log('API running on port ' + port);

module.exports = app;