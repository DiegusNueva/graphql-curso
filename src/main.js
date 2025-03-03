import { createSchema, createYoga } from "graphql-yoga";
import { createPubSub } from "@graphql-yoga/subscription"; // ✅ Import correcto
import { createServer } from "http";
import { readFileSync } from "fs";
import { join } from "path";
import Query from "./resolvers/Query";
import Author from "./resolvers/Author";
import Book from "./resolvers/Book";
import Mutation from "./resolvers/Mutation";
import Subscription from "./resolvers/Subscription";
import db from "./db";

const pubsub = createPubSub(); // 💡 Crear una instancia de PubSub

const typeDefs = readFileSync(join(__dirname, "../src/schema.graphql"), "utf8");

const resolvers = {
  Query,
  Author,
  Book,
  Mutation,
  Subscription
};

// Crear el esquema GraphQL
const schema = createSchema({
  typeDefs,
  resolvers,
});

// Crear la instancia de Yoga con `graphqlEndpoint: '/'`
const yoga = createYoga({
  schema,
  graphqlEndpoint: "/", 
  context: () => ({ db, pubsub }), // 💡 Se pasa `pubsub` correctamente
});

// Crear y arrancar el servidor HTTP
const server = createServer(yoga);

server.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});