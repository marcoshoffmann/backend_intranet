const mysql = require("mysql2");
const dotenv = require("dotenv").config()

// Função que cria a pool com o banco de dados passado como argumento
function createPoolWithDatabase(dbName) {
    const pool = mysql.createPool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: dbName // O banco de dados é passado como argumento
    });

    return pool.promise(); // Retorna a pool com promessas
}

module.exports = createPoolWithDatabase; // Exporta a função
