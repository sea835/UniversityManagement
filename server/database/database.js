const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'CyberVN*2004',
    database: 'university_management'
});

module.exports = connection.promise();
