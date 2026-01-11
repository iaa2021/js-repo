let readline = require('readline');
let mysql = require('mysql');

let con = mysql.createConnection({
    host : 'localhost',
    user : 'iaa',
    password : '061100',
    database : 'mydb'
})
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})
let id; let name; let values = []; let i = 0; let j = 0;
function askId(){
    rl.question("Input id, if id == -1, close ", (answer) => {
    id = Number(answer);
    if(id === -1){
        rl.close();
        console.log(values);
    return }
    values.push(id);
    askId();
})
}
askId();

