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
   let sql = "CREATE TABLE customers1 (name VARCHAR(255), address VARCHAR(255))";
   con.query(sql, (err, result) => {
     if (err) throw err;
     console.log("Table created");
   });
 });