import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "http";
import { readFileSync } from "fs";
import { join } from "path";
import Query from "./resolvers/Query";
import Author from "./resolvers/Author";
import Book from "./resolvers/Book";
import db from "./db";

const typeDefs = readFileSync(join(__dirname, "../src/schema.graphql"), "utf8");

const resolvers = {
  Query,
  Author,
  Book
};

const context = {
  db,
};

// Crear el esquema GraphQL
const schema = createSchema({
  typeDefs,
  resolvers,
});

// Crear la instancia de Yoga con `graphqlEndpoint: '/'`
const yoga = createYoga({
  schema,
  graphqlEndpoint: "/", // Mueve la interfaz de GraphQL a "/"
  context: { db },
});

// Crear y arrancar el servidor HTTP
const server = createServer(yoga);

server.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
