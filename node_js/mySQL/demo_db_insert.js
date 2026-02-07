let mysql = require('mysql');

let con = mysql.createConnection({
  host: "localhost",
  //host: '127.0.0.1', for mx linux
  user: "iaa",
  password: "061100",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  let sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});
