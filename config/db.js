const mysql = require('mysql');

const db = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '123456',
            database: 'starwars_assessment',
            // socketPath: 'C:/xampp/mysql/mysql.sock',
            port: '3306'
        });


module.exports = db;