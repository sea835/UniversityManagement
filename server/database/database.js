const mysql = require("mysql2");
const connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'university_management'

});

module.exports = connection.promise();
