import { GraphQLServer } from "graphql-yoga";
import uuidv4 from 'uuid/v4';

// Demo user data
const users = [
  { id: "1", name: "deyvid", email: "deyvidyury@gmail.com", age: 34 },
  { id: "2", name: "sara", email: "sara@gmail.com", age: 24 },
  { id: "3", name: "Mike", email: "mike@gmail.com", age: 14 }
];

const posts = [
  {
    id: "1",
    title: "Post One",
    body: "This is post one",
    published: true,
    author: "1"
  },
  {
    id: "2",
    title: "Post Two",
    body: "This is post two",
    published: false,
    author: "1"
  },
  {
    id: "3",
    title: "Post Three",
    body: "This is post three",
    published: true,
    author: "2"
  }
];

const comments = [
  {
    id: "1",
    text: "Comment one",
    author: '1',
    post: '1'
  },
  {
    id: "2",
    text: "Comment two",
    author: '2',
    post: '2'
  },
  {
    id: "3",
    text: "Comment three",
    author: '3',
    post: '3'
  },
  {
    id: "4",
    text: "Comment four",
    author: '1',
    post: '3'
  },
  {
    id: "5",
    text: "Comment five",
    author: '2',
    post: '2'
  },
  {
    id: "6",
    text: "Comment six",
    author: '3',
    post: '1'
  },
]

// Type definition (schema)
const typeDefs = `
    type Query {
      me: User!
      post: Post!
      users(query: String): [User!]!
      posts(query: String): [Post!]!
      comments: [Comment!]!
    }

    type Mutation {
      createUser(data: CreateUserInput!): User!
      createPost(data: CreatePostInput!): Post!
      createComment(data: CreateCommentInput!): Comment!
    }

    input CreateUserInput {
      name: Strin!,
      email: String!,
      age: Int
    }

    input CreatePostInput {
      title: String!, 
      body: String!, 
      published: Boolean!, 
      author: ID!
    }

    input CreateCommentInput {
      text: String!, 
      author: ID!, 
      post: ID!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
      id: ID!,
      text: String!
      author: User!
      post: Post!
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
    users(parent, args, ctc, info) {
      if (!args.query) {
        return users;
      }

      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }

      return posts.filter(post => {
        return (
          post.title.toLowerCase().includes(args.query.toLowerCase()) ||
          post.body.toLowerCase().includes(args.query.toLowerCase())
        );
      });
    },
    comments(parent, args, ctx, info) {
      return comments;
    }
  },
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some((user) => user.email === args.data.email)
      
      if (emailTaken) {
        throw new Error('Email taken.')
      }

      const user = {
        id: uuidv4(),
        ...args.data
      }

      users.push(user)

      return user
    },
    createPost(parent, args, ctc, info) {
      const userExists = users.some(user => user.id === args.data.author)

      if (!userExists) {
        throw new Error('User not found.')
      }

      const post = {
        if: uuidv4(),
        ...args.data
      }

      posts.push(post)

      return post
    },
    createComment(parent, args, ctx, info) {
      const userExists = users.some(user => user.id === args.data.author)
      const postExists = posts.some(post => post.id === args.data.post && post.published)

      if (!userExists || !postExists) {
        throw new Error('Unable to find user and post')
      }

      const comment = {
        id: uuidv4(),
        ...args.data
      }

      comments.push(comment);

      return comment
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, ctc, info) {
      return comments.filter(comment => {
        return comment.post === parent.id
      })
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id
      })
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.author === parent.id
      })
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author
      })
    },
    post(parent, args, ctx, info) {
      return posts.find(post => {
        return post.id === parent.post
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
