const mysql = require('mysql'); 


const db = mysql.createConnection({
    host: "qvti2nukhfiig51b.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "olqoxlmsb3qfvqut",
    password: "a5ntsynwabovnne2",
    database: "eizvch9eg74ubykx",
    port: 3306,
});

db.connect(function(err) {
    if (err) throw err;
    console.log('DATABASE CONNECTED!');
});

module.exports = db;