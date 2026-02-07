 const mysql = require('mysql');

const con = mysql.createConnection({
  host: '127.0.0.1',   // 👈 IMPORTANT
  user: 'iaa',
  password: '061100'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});