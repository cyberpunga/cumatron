import React from "react"
import { Query } from "react-apollo"
import { useApolloClient } from "@apollo/react-hooks"
import gql from "graphql-tag"

import SEO from "../components/seo"

const SHEETPOEM_QUERY = gql`
  query {
    sheetpoem(
      spreadsheetId: "1qjgDw3TREpqQoSSbB0tzd0Joues1jraJix2mU52zToU"
      range: "A1:A1000"
      verses: 4
    )
  }
`

const IndexPage = () => {
  const client = useApolloClient()
  return (
    <>
      <SEO title="..." />
      <Query
        query={SHEETPOEM_QUERY}
        pollInterval={30 * 1000}
        onCompleted={({ sheetpoem }) =>
          client.writeData({ data: { words: sheetpoem } })
        }
      >
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>
          if (error) return <div>Error: {error.message}</div>
          return <div>{data.sheetpoem}</div>
        }}
      </Query>
    </>
  )
}

export default IndexPage
