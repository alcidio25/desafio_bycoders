/**
* Criado por Alcidio Lucas - 28/05/2021
*/

const express    = require('express')
      consign    = require('consign')
      upload     = require('express-fileupload')
      bodyParser = require('body-parser')
      passport   = require('passport');
      cookieSession = require('cookie-session')
      

const app = express();
app.use(upload());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieSession({
  name: 'cnab-session',
  keys: ['key1', 'key2']
}))

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static('./app/files'));
app.use(express.static('./assets/css'));

consign().include('./app/routes')
         .then('./config/database.js')
         .then('./config/passport-config.js')
         .then('./config/auth-middleware.js')
         .then('./app/models')
         .then('./app/controllers')
         .into(app)

module.exports = app;