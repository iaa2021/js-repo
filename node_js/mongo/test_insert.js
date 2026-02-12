const { MongoClient } = require('mongodb');

async function run() {
  console.log("Script started");

  const url = "mongodb://127.0.0.1:27017/?directConnection=true";
  const client = new MongoClient(url, { serverSelectionTimeoutMS: 5000 });

  try {
    console.log("Connecting...");
    await client.connect();
    console.log("Connected successfully");

    const db = client.db("mydb");
    const collection = db.collection("customers");

    const result = await collection.insertOne({ name: "Test Customer" });
    console.log("Inserted document:", result);

  } catch (err) {
    console.error("ERROR:", err);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

run();
