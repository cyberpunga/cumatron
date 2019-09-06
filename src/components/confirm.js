import React from "react"
import { useApolloClient, useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

const IS_LOADED = gql`
  query IsLoaded {
    isLoaded @client
  }
`

export default ({ children }) => {
  const { data } = useQuery(IS_LOADED)
  const client = useApolloClient()
  return (
    <>
      <div>{data.isLoaded ? "false" : "true"}</div>
      <button
        onClick={() => {
          client.writeData({ data: { isLoaded: !data.isLoaded } })
        }}
      >
        {children}
      </button>
    </>
  )
}
