/**
* Criado por Alcidio Lucas - 29/05/2021
*/

const express    = require('express')
      consign    = require('consign')
      upload     = require('express-fileupload')
      bodyParser = require('body-parser');
      

const app = express();
app.use(upload());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static('./app/files'));

consign().include('./app/routes')
         .then('./config/database.js')
         .then('./app/models')
         .then('./app/controllers')
         .into(app)

module.exports = app;