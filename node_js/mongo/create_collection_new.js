const { MongoClient } = require('mongodb');

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("mydb");
    console.log("Using database:", db.databaseName);

    const collection = db.collection("customers");
    const result = await collection.insertOne({ name: "Sample Customer" });
    console.log("Inserted document with _id:", result.insertedId);

  } catch (err) {
    console.error("ERROR:", err);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

run();
