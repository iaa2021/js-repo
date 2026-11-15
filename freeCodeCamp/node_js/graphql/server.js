import express from 'express';
import {graphqlHTTP} from 'express-graphql';
import {buildSchema} from 'graphql';

//sample data
const books = [
  { id: 1,
    title: 'The Awakening',
    author: 'Kate Chopin',
    year: 1899,
    genre: 'Fiction'
    },
  { id: 2,
    title: 'City of Glass', 
    author: 'Paul Auster', 
    year: 1985, 
    genre: 'Fiction' },
];
// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
    # A book type represents a book with a title, author, year, and genre
  type Book {
    id: ID!
    title: String
    author: String
    year: Int
    genre: String
  }
    # The root query type defines the entry point for queries
  type Query {
   # Returns a list of all books
    books: [Book!]!
    # Returns a single book by ID
    book(id: ID!): Book
    # searches for books by title or author
    searchBooks(query: String!): [Book!]!
  }
    #inputs for adding/updating books
  input BookInput {
    title: String
    author: String
    year: Int
    genre: String
  }
    type Mutation {
    # Adds a new book to the collection
    addBook(input: BookInput!): Book!
    # Updates an existing book by ID
    updateBook(id: ID!, input: BookInput!): Book
    # Deletes a book by ID
    deleteBook(id: ID!): Boolean
  }
`);
const root = {
  books: () => {
    return books;
  },
  // error handling for book query
  book: ({ id }) => {
    const book = books.find(book => book.id === parseInt(id));
    if (!book) {
      throw new Error(`Book with ID ${id} not found`);
    }
    return book;
  },
  searchBooks: ({ query }) => {
    const lowerCaseQuery = query.toLowerCase();
    return books.filter(book => 
      book.title.toLowerCase().includes(lowerCaseQuery) ||
      book.author.toLowerCase().includes(lowerCaseQuery)
    );
  },
  // Mutation resolvers
  addBook: ({ input }) => {
    const newBook = {
      id: String(books.length + 1),
      ...input,
    };
    books.push(newBook);
    return newBook;
  },
  updateBook: ({ id, input }) => {
    const bookIndex = books.findIndex(book => book.id === parseInt(id));
    if (bookIndex === -1) {
      throw new Error(`Book with ID ${id} not found`);
    }
    books[bookIndex] = { ...books[bookIndex], ...input };
    return books[bookIndex];
  },
  deleteBook: ({ id }) => {
    const bookIndex = books.findIndex(book => book.id === parseInt(id));
    if (bookIndex === -1) return false;
    books.splice(bookIndex, 1);
    return true;
  }
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));