const readline = require('readline');
const mysql = require('mysql');
const { resolve } = require('path');
const { escape } = require('querystring');
let rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});
let con = mysql.createConnection({
    host : 'localhost',
    user : 'iaa', 
    password : '061100',
    database : 'mydb'
})

async function askQuestion(query) {
    return new Promise(resolve => {
        rl.question(query, resolve );
    })
}
async function userSurvey() {
    try{
        let name = await askQuestion("Input table's name: ");
        return name;
    } catch(err){
        console.error('Error occured.', err);
    }
}
async function main() {
    try{
        let name = await userSurvey("Input table's name: ");
        let sql = "SELECT * FROM ??";
        con.connect(err =>{
            if(err) throw err;
            con.query(sql, [name], (err, result, fields) => {
                if(err) throw err;
                let values = []; let object = [];
                fields.forEach(element => {
                   // console.log(element.name, ', ');
                  //  object.push(element.name);
                    // console.log(mysql.Types[element.type]);
                    //object.push(mysql.Types[element.type]);
                    values.push(element.name);
                    //object = [];
                })
                console.log(values);
                con.end();
                rl.close();
            });
        });
    } catch(err){
        console.error("Error occured ", err);
    }
}
main();