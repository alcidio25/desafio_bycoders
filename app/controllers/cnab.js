/**
* Criado por Alcidio Lucas - 28/05/2021
*/

var lineReader = require('line-reader');

module.exports.uploadArquivo = (aplicacao, req, res) => {
    if(req.files){
        if(this.validarArquivo(req.files.cnab, res)){
            const cnab = this.upload(req.files.cnab, res)
            this.converterCNAB(cnab);
        }
    }else{
        res.render('../views/index', {msg: 'Selecione um arquivo'});
    }
}

exports.converterCNAB = cnab => {
    let dados = [];
    lineReader.eachLine(cnab, function(line, last) {
        linha = {};
        linha.tipo = line.slice(0,1);
        linha.data = line.slice(2,9);
        linha.valor = line.slice(10,19);
        linha.cpf = line.slice(20,30);
        linha.cartao = line.slice(31,42);
        linha.hora = line.slice(43,48);
        linha.dono = line.slice(49,62);
        linha.nome = line.slice(63,81);
        dados.push(linha);
        if (last) {
            return false;
        }
    });
}

exports.upload = (cnab, res) => {
    const timestamp = new Date().getTime();
    const arquivo = cnab;
    const nome_arquivo = __dirname + '/../files/' + timestamp + '_' + arquivo.name ;
    arquivo.mv(nome_arquivo, err => {
        if(err){
            res.render('../views/index', {msg: 'Ocorreu um erro ao carregar arquivo'});
        }else{
            res.render('../views/index', {msg: 'Arquivo carregado com sucesso'});
        }
    });
    return nome_arquivo;
}

exports.validarArquivo = (arquivo, res) => {
    let retorno = true;
    if(arquivo.size > 52428800){
        retorno = false;
        res.render('../views/index', {msg: 'O tamanho do arquivo deve ser menor a 5MB'});
    }else if(arquivo.mimetype !== 'text/plain'){
        retorno = false;
        res.render('../views/index', {msg: 'O arquivo deve ter o formato TXT'});
    }
    return retorno;
}