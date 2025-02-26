import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "http";

const typeDefs = `
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello World!",
  },
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
});

// Crear y arrancar el servidor HTTP
const server = createServer(yoga);

server.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
