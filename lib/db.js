//Inset Depedency Mysql
const mysql = require("mysql");

//Setup Connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "db_books",
});

//Status Connection to Database
connection.connect(function (error) {
  if (!!error) {
    console.log(error);
  } else {
    console.log("Database is Connected");
  }
});

module.exports = connection;
