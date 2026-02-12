const { MongoClient } = require('mongodb');

async function run() {
  const url = "mongodb://127.0.0.1:27017/?directConnection=true";
  const client = new MongoClient(url, { serverSelectionTimeoutMS: 5000 });

  try {
    console.log("Connecting...");
    await client.connect();
    console.log("Connected!");

    const db = client.db("mydb");

    const result = await db.collection("customers").findOne({});
    if (result) {
      console.log("Found:", result);
    } else {
      console.log("No documents found");
    }

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

run();