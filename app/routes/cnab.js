/**
* Criado por Alcidio Lucas - 28/05/2021
*/

module.exports = aplicacao => {
    
    aplicacao.get('/', (req, res) => {
        res.render('../views/index', {msg: ''});
    });
    
    aplicacao.post('/', (req, res) => {
        aplicacao.app.controllers.cnab.uploadArquivo(aplicacao, req, res);
    })
}