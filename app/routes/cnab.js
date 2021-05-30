/**
* Criado por Alcidio Lucas - 28/05/2021
*/

require('../../config/passport-config');
const auth = require('../../config/auth-middleware');

module.exports = aplicacao => {
    
    aplicacao.get('/home', auth.verificarAutenticacao, (req, res) => {
        res.render('../views/index', {msg: ''});
    });
    
    aplicacao.post('/home', auth.verificarAutenticacao, (req, res) => {
        aplicacao.app.controllers.cnab.uploadArquivo(aplicacao, req, res);
    });
    
    aplicacao.get('/lojas', auth.verificarAutenticacao, (req, res) => {
        aplicacao.app.controllers.cnab.obterLojas(aplicacao, req, res);
    });
    
    aplicacao.get('/loja', (req, res) => {
        aplicacao.app.controllers.cnab.obterOperacoes(aplicacao, req, res);
    });
    
    aplicacao.get('/sair', (req, res) => {
        req.session = null;
        req.logout();
        res.redirect('/')
    });
    
    aplicacao.get('/', passport.authenticate('google', { scope: ['profile'] }));
    
    aplicacao.get('/erro', (req, res) => res.send('Verifique os seus dados de login e tente outra vez'));

    aplicacao.get('/google/callback', 
      passport.authenticate('google', { failureRedirect: '/erro' }),
      (req, res) => {
        res.redirect('/home');
      });

}