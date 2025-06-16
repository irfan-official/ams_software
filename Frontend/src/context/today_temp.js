import express from "express"
import {ApolloServer, gql} from "apollo-server-express"

const app = express();
const typeDefs = gql`



type Query {
    name: String!,
    _id: ID!,
    email: String!,
}
`

const resolver = {
    Query: {
        
    }
}


async function app(){
    const server = ApolloServer({typeDefs, resolver})
    await server.start();

    server.applyMiddleware(app)

    app.listen(port, () => console.log(`server started at http://localhost:4000${server.graphqlPath}`))
}