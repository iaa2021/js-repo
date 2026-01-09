 let mysql = require('mysql');

let con = mysql.createConnection({
  host: "localhost",
  user: "iaa",
  password: "061100",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  let sql = "SELECT * FROM customers LIMIT 5 OFFSET 2";
  //let sql = "SELECT * FROM customers LIMIT 2, 5"; shorter syntax
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});
