/**
* Criado por Alcidio Lucas - 28/05/2021
*/

class CNAB{
    constructor(conexao){
        this._conexao = conexao;
    }
    
    adicionarCNAB(dados, callback) {
        const sql = "insert into cnab set tipo = ?, data = ?, valor = ?, cpf = ?, cartao = ?, hora = ?, dono = ?, nome = ?";
        this._conexao.query(sql, [
            dados.tipo,
            dados.data,
            dados.valor,
            dados.cpf,
            dados.cartao,
            dados.hora,
            dados.dono,
            dados.nome
        ], callback);
    };
    
    obterLojas(dados, callback){
        const sql = 'select cnab.id_cnab, cnab.nome from cnab group by cnab.nome';
        this._conexao.query(sql, callback);
    }
    
    obterOperacoes(loja, callback){
        const sql = 'SELECT * FROM `cnab` WHERE cnab.nome = ?';
        this._conexao.query(sql, [loja], callback);
    }
}

module.exports = () => CNAB;