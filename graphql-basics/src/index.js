import { GraphQLServer } from "graphql-yoga";

// Type definition (schema)
const typeDefs = `
    type Query {
      greeting(name: String, position: String): String!
      me: User!
      post: Post!
      add(numbers: [Float!]!): Float
      grades: [Int!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`;

// Resolvers
const resolvers = {
  Query: {
    greeting(parent, args, ctx, info) {
      if (args.name && args.position) {
        return `Hello ${args.name}! You are my favorite ${args.position}.`;
      } else {
        return "Hello";
      }
    },
    add(parant, args) {
      if (args.numbers.length == 0) {
        return 0;
      }

      return args.numbers.reduce((acumulator, currentValue) => {
        return acumulator + currentValue;
      });
    },
    grades(parent, args, ctx, info) {
      return [99, 80, 93];
    },
    me() {
      return {
        id: "12345",
        name: "Deyvid",
        email: "deyvidyury@gmail.com"
      };
    },
    post() {
      return {
        id: "1234556",
        title: "Post one",
        body: "This is the post one",
        published: true
      };
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
