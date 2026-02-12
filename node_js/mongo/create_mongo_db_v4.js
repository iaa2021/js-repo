const { MongoClient } = require('mongodb');

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully");

    const db = client.db("mydb");
    console.log("Using DB:", db.databaseName);

    const result = await db.collection("users").insertOne({ name: "Andrey" });
    console.log("Inserted ID:", result.insertedId);
    //db.adminCommand({ listDatabases: 1 })
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();