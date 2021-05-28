/**
* Criado por Alcidio Lucas - 28/05/2021
*/

module.exports = aplicacao => {
    
    aplicacao.get('/', (req, res) => {
        res.render('../views/index', {msg: ''});
    });
    
    aplicacao.post('/', (req, res) => {
        aplicacao.app.controllers.cnab.uploadArquivo(aplicacao, req, res);
    });
    
    aplicacao.get('/lojas', (req, res) => {
        aplicacao.app.controllers.cnab.obterLojas(aplicacao, req, res);
    });
    
    aplicacao.get('/loja', (req, res) => {
        aplicacao.app.controllers.cnab.obterOperacoes(aplicacao, req, res);
    });
}