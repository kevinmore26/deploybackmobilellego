const mysql = require('mysql'); 


const db = mysql.createConnection({
    host: "containers-us-west-52.railway.app",
    user: "root",
    password: "KGF8kfjntWX5pOfC6i6T",
    database: "railway",
    port: process.env.PORT || 5000 ,
});

db.connect(function(err) {
    if (err) throw err;
    console.log('DATABASE CONNECTED!');
});

module.exports = db;