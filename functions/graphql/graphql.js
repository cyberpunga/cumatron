const { ApolloServer, gql } = require("apollo-server-lambda")
const sheetpoetry = require("./sheetpoetry")

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    sheetpoem(spreadsheetId: String!, range: String!, verses: Int): String
  }
`

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    sheetpoem: async (root, { spreadsheetId, range, verses }, context) =>
      await sheetpoetry(spreadsheetId, range, verses || 1),
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
})

exports.handler = server.createHandler()
