const { MongoClient } = require('mongodb');

async function run() {
  const client = new MongoClient("mongodb://127.0.0.1:27017");

  try {
    await client.connect();
    console.log("CONNECTED");

    const db = client.db("mydb");

    const result = await db.collection("users").insertOne({
      name: "Andrey",
      created: new Date()
    });

    console.log("INSERTED:", result.insertedId);
  } catch (err) {
    console.error("ERROR:", err);
  } finally {
    await client.close();
  }
}

run();
