const { ApolloServer, gql } = require("apollo-server-lambda")
const { sheetPoetry } = require("./sheetpoetry")

const typeDefs = gql`
  type Query {
    sheetpoem(spreadsheetId: String!, range: String!, verses: Int): String
  }
`

const resolvers = {
  Query: {
    sheetpoem: async (_, { spreadsheetId, range, verses }) =>
      await sheetPoetry(spreadsheetId, range, verses || 1),
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
})

exports.handler = server.createHandler()
