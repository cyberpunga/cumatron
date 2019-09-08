import React from "react"
import { useApolloClient, useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

const IS_LOADED = gql`
  query IsLoaded {
    isLoaded @client
    canSpeak @client
  }
`

export default ({ children }) => {
  const { data } = useQuery(IS_LOADED)
  const client = useApolloClient()
  return (
    <button
      disabled={!data.isLoaded}
      onClick={() => {
        client.writeData({ data: { canSpeak: !data.canSpeak } })
      }}
    >
      {// children
      `${data.isLoaded}`}
    </button>
  )
}
