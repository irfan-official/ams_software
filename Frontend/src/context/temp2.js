import express from "express"
import {ApolloServer, gql} from "apollo-server-express"


const app = express();


async function startServer(){

    const server = new ApolloServer({typeDefs, resolvers})
    await server.start();

    server.applyMiddleware({app});

    app.listen({port: 4000}, () => {
        console.log(`server started at http:localhost:4000${
            server.graphqlPath
        }`)
    })
}

const typeDefs = gql`
  type User {
    id: ID!,
    name: String!,
    email: String!,
  }

  type Query{
    getUser(id: ID!): User
    getUsers: [User]
  }

  type Mutation {
    createUser(name: String!, email: String!): User
    updateUser(id: ID!, name: String, email: String): User
    deleteUser(id: ID!): Boolean
  }
`

const resolvers = {
    Query: {
        getUser: async (_, {id}) => await User.findById(id),
        getUsers: async () => await User.find()
    }
}