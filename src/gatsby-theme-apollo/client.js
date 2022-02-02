import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"
import fetch from "isomorphic-fetch"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: process.env.SHEETPOETRY_API_ENDPOINT,
    fetch,
  }),
})

export default client
