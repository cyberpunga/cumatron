import React from "react"
import { Query } from "react-apollo"
import { useApolloClient } from "@apollo/react-hooks"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import styled from "styled-components"

import SEO from "../components/seo"
import Confirm from "../components/confirm"

const SHEETPOEM_QUERY = gql`
  query {
    sheetpoem(
      spreadsheetId: "1qjgDw3TREpqQoSSbB0tzd0Joues1jraJix2mU52zToU"
      range: "A1:A1000"
      verses: 4
    )
  }
`
const IS_LOADED = gql`
  query CanSpeak {
    canSpeak @client
    isLoaded @client
    words @client
  }
`

const Text = styled.p`
  font-family: Org_v01;
  color: yellow;
  position: absolute;
  bottom: 0;
  text-align: center;
  padding-bottom: 2em;
  left: 50%;
  transform: translateX(-50%);
`

const IndexPage = () => {
  const client = useApolloClient()
  const { data } = useQuery(IS_LOADED)

  return (
    <>
      {console.log(data)}
      <SEO title="..." />
      {data.canSpeak ? (
        <Query
          query={SHEETPOEM_QUERY}
          pollInterval={30 * 1000}
          onCompleted={({ sheetpoem }) => {
            client.writeData({ data: { words: sheetpoem } })
          }}
        >
          {({ data, loading, error }) => {
            if (loading) return <Text>Loading...</Text>
            if (error) return <Text>Error: {error.message}</Text>
            return <Text>{data.sheetpoem}</Text>
          }}
        </Query>
      ) : (
        <Confirm />
      )}
    </>
  )
}

export default IndexPage
