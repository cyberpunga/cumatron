import React /*, { useState } */ from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag"
// import { useApolloClient } from "@apollo/react-hooks"

import Scene from "../components/scene"
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
  // const client = useApolloClient()
  return (
    <>
      <SEO title="hola" />
      <Query
        query={SHEETPOEM_QUERY}
        pollInterval={30 * 1000}
        // onCompleted={({ sheetpoem }) => client.writeData({ data: { lala: sheetpoem } })}
      >
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>
          if (error) return <div>Error: {error.message}</div>
          return (
            <>
              <Scene words={data.sheetpoem} />
            </>
          )
        }}
      </Query>
    </>
  )
}

export default IndexPage
