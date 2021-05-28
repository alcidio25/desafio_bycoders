/**
* Criado por Alcidio Lucas - 28/05/2021
*/

module.exports.uploadArquivo = (aplicacao, req, res) => {
    if(req.files){
        if(this.validarArquivo(req.files.cnab, res)){
            this.upload(req.files.cnab, res)
        }
    }else{
        res.render('../views/index', {msg: 'Selecione um arquivo'});
    }
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