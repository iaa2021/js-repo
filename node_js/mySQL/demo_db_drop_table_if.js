let mysql = require('mysql');

let con = mysql.createConnection({
  host: "localhost",
  user: "iaa",
  password: "061100",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  let sql = "DROP TABLE IF EXISTS customers1";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});