const { MongoClient } = require('mongodb');
async function run(){
    const url = 'mongodb://127.0.0.1:27017/?directConnection=true';
    const client = new MongoClient(url, {ServerSelectionTimeoutMS : 500});
    let query = { address : 'Park Lane 38'};
    try{
        await client.connect();
        console.log('Server connected successfully.')
        const db = client.db('mydb');
        console.log('Using database: ', db.databaseName);
        const coll = db.collection('customers');
        const result = await coll.find(query).toArray();
        console.log(result);
        } catch(err){ console.error("ERROR:", err); }
        finally{ 
            client.close();
            console.log("Connection closed");
        }
    }
    run();
