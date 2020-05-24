import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"
import fetch from "isomorphic-fetch"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://sheetpoetry.now.sh/graphql",
    fetch,
  }),
})

export default client
