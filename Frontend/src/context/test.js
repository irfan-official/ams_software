const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();

// ✅ Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/graphql_demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ✅ Type Definitions (Schema)
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User]
  }

  type Mutation {
    createUser(name: String!, email: String!): User
    updateUser(id: ID!, name: String, email: String): User
    deleteUser(id: ID!): Boolean
  }
`;

// ✅ Resolvers
const resolvers = {
  Query: {
    getUser: async (_, { id }) => await User.findById(id),
    getUsers: async () => await User.find(),
  },
  Mutation: {
    createUser: async (_, { name, email }) => {
      return await User.create({ name, email });
    },
    updateUser: async (_, { id, name, email }) => {
      return await User.findByIdAndUpdate(id, { name, email }, { new: true });
    },
    deleteUser: async (_, { id }) => {
      await User.findByIdAndDelete(id);
      return true;
    },
  },
};

// ✅ Apollo Server with Express
async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();
