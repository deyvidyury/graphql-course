import { GraphQLServer } from "graphql-yoga";

// Demo user data
const users = [
    {id: '1', name: 'deyvid', email: 'deyvidyury@gmail.com', age: 34},
    {id: '2', name: 'sara', email: 'sara@gmail.com', age: 24},
    {id: '3', name: 'Mike', email: 'mike@gmail.com', age: 14}
]

const posts = [
    {id: '1', title: 'Post One', body: 'This is post one', published: true},
    {id: '2', title: 'Post Two', body: 'This is post two', published: false},
    {id: '3', title: 'Post Three', body: 'This is post three', published: true}
]

// Type definition (schema)
const typeDefs = `
    type Query {
      me: User!
      post: Post!
      users(query: String): [User!]!
      posts(query: String): [Post!]!
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
    },
    users (parent, args, ctc, info) {
        if (!args.query) {
            return users
        }

        return users.filter((user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase())
        })
    },
    posts (parent, args, ctx, info) {
        if (!args.query) {
            return posts
        }

        return posts.filter((post) => {
            return (post.title.toLowerCase().includes(args.query.toLowerCase()) || post.body.toLowerCase().includes(args.query.toLowerCase()))
        })
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
