import React, { useState } from "react"
import { Link } from "gatsby"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import { useApolloClient } from "@apollo/react-hooks"

import Layout from "../components/layout"
import Scene from "../components/scene"
import Confirm from "../components/confirm"
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
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <Confirm />
      <Scene words="lala" />
      {
        // <Query
        // query={SHEETPOEM_QUERY}
        // pollInterval={30 * 1000}
        // onCompleted={({ sheetpoem }) =>
        // client.writeData({ data: { lala: sheetpoem } })
        // }
        // >
        // {({ data, loading, error }) => {
        // if (loading) return <p>Loading...</p>
        // if (error) return <p>Error: {error.message}</p>
        // return <div>{data.sheetpoem}</div>
        // }}
        // </Query>
      }
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export default IndexPage
