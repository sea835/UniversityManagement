const mysql = require("mysql2");
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "123456",
//   database: "university_management",
// });

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "university_management",
});

connection.connect((err) => {
  if (err) {
    console.error("Kết nối đến database thất bại: ", err.message);
  } else {
    console.log("Kết nối đến database thành công!");
  }
});

module.exports = connection.promise();
