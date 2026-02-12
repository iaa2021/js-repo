const { MongoClient } = require('mongodb');

const url = "mongodb://127.0.0.1:27017/?directConnection=true";
const client = new MongoClient(url, { serverSelectionTimeoutMS: 5000 });

async function run() {
  try {
    console.log("Connecting...");
    await client.connect();
    console.log("Connected!");

    const db = client.db("mydb");

    const result = await db.collection("customers")
      .find({}, { projection: { _id: 0, name: 1, address: 1 } })
      .toArray();

    console.log("Documents:", result);

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

run();