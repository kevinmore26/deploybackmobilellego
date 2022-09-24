const mysql = require('mysql');
const DB_HOST = process.env.DB_HOST1 || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'password';
const DB_NAME = process.env.DB_NAME || 'llegoshopmobile' ;
const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
});

db.connect(function(err) {
    if (err) throw err;
    console.log('DATABASE CONNECTED!');
});

module.exports = db;