 let mysql = require('mysql');
  
  let con = mysql.createConnection({
    host: "localhost",
    user: "iaa",
    password: "061100",
    database: "mydb"
  });
  
  con.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
    let sql = "CREATE TABLE products (id INTEGER, name VARCHAR(255))";
    con.query(sql, (err, result) => {
      if (err) throw err;
      console.log("Table created");
    });
  });