import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { HttpLink } from "apollo-link-http"
import fetch from "isomorphic-fetch"
import gql from "graphql-tag"

const cache = new InMemoryCache()
cache.writeData({
  data: {
    isLoaded: false,
    canSpeak: false,
    words: "",
  },
})

const link = new HttpLink({
  uri: "/.netlify/functions/graphql",
})

const typeDefs = gql`
  extend type Query {
    isLoaded: Boolean!
    canSpeak: Boolean!
    words: String!
  }
`

const resolvers = {}

export const client = new ApolloClient({
  cache,
  link,
  fetch,
  typeDefs,
  resolvers,
})
