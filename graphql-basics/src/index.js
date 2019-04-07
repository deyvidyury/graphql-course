import { GraphQLServer } from "graphql-yoga";

// Type definition (schema)
const typeDefs = `
    type Query {
        id: ID!
        name: String!
        age: Int!
        employed: Boolean!
        gpa: Float
    }
`;

// Resolvers
const resolvers = {
  Query: {
    id() {
      return "abc123";
    },
    name() {
      return "Deyvid";
    },
    age() {
      return 34;
    },
    employed() {
      return true;
    },
    gpa() {
      return null;
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log("The server is up!");
});
