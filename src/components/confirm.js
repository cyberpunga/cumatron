import React from "react"
import { useApolloClient, useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import styled from "styled-components"

const IS_LOADED = gql`
  query IsLoaded {
    isLoaded @client
    canSpeak @client
  }
`

const Confirm = styled.div`
  background: #111111;
  color: #eeeeee;
  text-align: center;
`

const Text = styled.div`
  font-family: Org_v01;
  text-align: justify;
  padding: 8px;
`

const Button = styled.button`
  background: transparent;
  color: #eeeeee;
  font-family: Org_v01;
  font-size: 1.25em;
  margin: 8px;
`

export default ({ children }) => {
  const { data } = useQuery(IS_LOADED)
  const client = useApolloClient()
  return (
    <Confirm>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </Text>
      <Button
        disabled={!data.isLoaded}
        onClick={() => {
          client.writeData({ data: { canSpeak: !data.canSpeak } })
        }}
      >
        {data.isLoaded ? "vamos!" : "loading..."}
      </Button>
    </Confirm>
  )
}
