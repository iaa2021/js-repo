 const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { MongoClient, ObjectId } = require('mongodb');

// MongoDB connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

let db;

// Connect to MongoDB
async function connectDB() {
  await client.connect();
  db = client.db('mydb');
  console.log('Connected to MongoDB');
}

connectDB();

// 1️⃣ GraphQL Schema
const schema = buildSchema(`
  type User {
    _id: String
    name: String
  }

  type Customer {
    _id: String
    name: String
    address: String
  }

  type Query {
    users: [User]
    customers: [Customer]
    customer(id: String!): Customer
  }
`);

// 2️⃣ Resolvers
const root = {
  users: async () => {
    return await db.collection('users').find().toArray();
  },

  customers: async () => {
    return await db.collection('customers').find().toArray();
  },

  customer: async ({ id }) => {
    return await db
      .collection('customers')
      .findOne({ _id: new ObjectId(id) });
  }
};

// 3️⃣ Express server
const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('Server running at http://localhost:4000/graphql');
});