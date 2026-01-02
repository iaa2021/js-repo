let mysql = require('mysql');

let con = mysql.createConnection({
  host: "localhost",
  user: "iaa",
  password: "061100"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});