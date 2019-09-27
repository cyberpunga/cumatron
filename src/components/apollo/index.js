import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import fetch from "isomorphic-fetch"
import gql from "graphql-tag"

import sheetpoetry from "../local/sheetpoetry"

const cache = new InMemoryCache()
cache.writeData({
  data: {
    isLoaded: false,
    canSpeak: false,
    words: "",
  },
})

const typeDefs = gql`
  extend type Query {
    isLoaded: Boolean!
    canSpeak: Boolean!
    words: String!
    sheetpoem(spreadsheetId: String!, range: String!, verses: Int): String
  }
`

const resolvers = {
  Query: {
    sheetpoem: async (root, { spreadsheetId, range, verses }, context) =>
      await sheetpoetry(spreadsheetId, range, verses || 1),
  },
}

export const client = new ApolloClient({
  cache,
  fetch,
  typeDefs,
  resolvers,
})
