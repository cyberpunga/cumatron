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
  text-align: center;
  font-size: 28px;
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
        #renunciapiñera #renunciapiñera #renunciapiñera #renunciapiñera
        #renunciapiñera #renunciapiñera
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
