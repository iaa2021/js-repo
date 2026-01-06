 let mysql = require('mysql');

let con = mysql.createConnection({
  host: "localhost",
  user: "iaa",
  password: "061100",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM customers ORDER BY name DESC", function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});