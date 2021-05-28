/**
* Criado por Alcidio Lucas - 28/05/2021
*/

const mysql = require('mysql');

const conexao = () => {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'dados'
    });
};

module.exports = () => conexao;