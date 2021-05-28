/**
* Criado por Alcidio Lucas - 28/05/2021
*/

var lineReader = require('line-reader');

exports.cnabModel = aplicacao => {
    const conexao = aplicacao.config.database();
    const cnab = new aplicacao.app.models.CNAB(conexao);
    return {conexao, cnab};
}

module.exports.uploadArquivo = async (aplicacao, req, res) => {
    if(req.files){
        if(this.validarArquivo(req.files.cnab, res)){
            const cnab = this.upload(req.files.cnab, res)
            dados = await this.converterCNAB(cnab);
            let i = 0;
            while(i < dados.length){
                await this.inserirCNAB(dados[i], aplicacao, res);
                i++;
            }
            res.redirect('/lojas');
        }
    }else{
        res.render('../views/index', {msg: 'Selecione um arquivo'});
    }
}

module.exports.obterLojas = (aplicacao, req, res) => {
    const model = this.cnabModel(aplicacao);
    model.cnab.obterLojas(null, (error, result) => {
        if(error){
            return res.send('Ocorreu um erro');
        }
        res.render('../views/lojas', {lojas: result});
    });
    model.conexao.end();
}

module.exports.obterOperacoes = (aplicacao, req, res) => {
    const model = this.cnabModel(aplicacao);
    const loja = req.query.id;
    model.cnab.obterOperacoes(loja, (error, result) => {
        if(error){
            return res.send('Ocorreu um erro');
        }
        result = this.formatarTransacoes(result);
        model.conexao.end();
        res.render('../views/loja', {operacoes: result});
    });
};

exports.formatarTransacoes = transacoes => {
    for(let i = 0; i < transacoes.length; i++){
        transacoes[i].tipo = this.definirTransacao(transacoes[i].tipo);
    }
    return transacoes;
}

exports.definirTransacao = tipo => {
    let operacao = '';
    console.log(tipo);
    switch (Number.parseInt(tipo)){
        case 1:
            operacao = 'Debito';
            break;
        case 2:
            operacao = 'Boleto';
            break;
        case 3:
            operacao = 'Financiamento';
            break;
        case 4:
            operacao = 'Crédito';
            break;
        case 5:
            operacao = 'Recebimento Empréstimo';
            console.log('Operacao', operacao)
            break;
        case 6:
            operacao = 'Vendas';
            break;
        case 7:
            operacao = 'Recebimento TED';
            break;
        case 8:
            operacao = 'Recebimento DOC';
            break;
        case 9:
            operacao = 'Aluguel';
            break;
    }
    return operacao;
}

exports.inserirCNAB = (dados, aplicacao, res) => {
    return new Promise((resolve, reject) => {
        dados.data = this.formatarData(dados.data);
        dados.hora = this.formatarHora(dados.hora);
        const model = this.cnabModel(aplicacao);
        model.cnab.adicionarCNAB(dados, (error, result) => {
            if(error){
                return res.send(error)
            }
            model.conexao.end();
            resolve(true);
        });
    })
}

exports.formatarHora = horario => {
    hora = horario.slice(0, 2);
    minuto = horario.slice(2, 4);
    segundo = horario.slice(4, 6);
    return hora + ':' + minuto + ':' + segundo;
}

exports.formatarData = data => {
    ano = data.slice(0, 4);
    mes = data.slice(4,6);
    dia = data.slice(6,8);
    return ano + '-' + mes + '-' + dia;
}

exports.converterCNAB = cnab => {
    return new Promise((resolve, reject) => {
        let dados = [];
        lineReader.eachLine(cnab, {encoding: 'utf8'}, (line, last) => {
            linha = {};
            linha.tipo = line.slice(0,1);
            linha.data = line.slice(1,9);
            linha.valor = line.slice(9,19);
            linha.cpf = line.slice(19,30);
            linha.cartao = line.slice(30,42);
            linha.hora = line.slice(42,48);
            linha.dono = line.slice(48,62);
            linha.nome = line.slice(62,81);
            dados.push(linha)
            if (last) {
                resolve(dados)
                return false;
            }
        });
    })
}

exports.upload = (cnab, res) => {
    const timestamp = new Date().getTime();
    const arquivo = cnab;
    const nome_arquivo = __dirname + '/../files/' + timestamp + '_' + arquivo.name ;
    arquivo.mv(nome_arquivo, err => {
        if(err){
            res.render('../views/index', {msg: 'Ocorreu um erro ao carregar arquivo'});
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