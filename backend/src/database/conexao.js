require('dotenv').config();

const mysql = require('mysql2/promise');

// Pool de conexao com o MySQL. Em vez de abrir uma conexao manual a cada
// requisicao, o pool gerencia varias conexoes prontas para uso.
const conexao = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

module.exports = conexao;
