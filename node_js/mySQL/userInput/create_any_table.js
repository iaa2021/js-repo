let mysql = require('mysql');
let readline = require('readline');

let con = mysql.createConnection({
    host : 'localhost',
    user : 'iaa', 
    password : '061100',
    database : 'mydb'
})

let rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

function askQuestion(query){
    return new Promise(resolve => {
        rl.question(query, resolve);
    })
}

async function userSurvey(name) {
  try { 
    console.log('Table name is ', name);
    let fields = [];
    while(true){
        let fieldName = await askQuestion( 'Input name of field, -1 to end input: ');
        if(Number(fieldName) === -1){
        rl.close();
        console.log(fields);
        let string = `CREATE TABLE ${name} ( `;
        fields.forEach(element => {
            string += element;
        });
        string += ')';
        console.log(string);
        break;
        };
    let fieldType = await askQuestion( 'Input type of field: ');
    fields.push([ fieldName, fieldType ]);
    }
} catch(err){
    console.error('Error occured.', err);
}
}
async function main(){
    let name = await askQuestion('Input name of table: ');
    await userSurvey(name);
}
main();
