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
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(250, 0, 0, 0.5);
`

const Header = styled.header`
  /* background: rgba(2, 2, 2, 0.98); */
  transition: 0.5s;
  padding: 24px 48px;
`

const Title = styled.h1`
  text-align: justify;
  transition: 0.5s;
  z-index: 100;
  margin: 0;
  color: ${({ state }) =>
    state === "entered" ? "#fefefe" : "rgba(0, 0, 0, 0.8)"};
  text-decoration: none;
`

const Text = styled.p`
  color: #ffffffff;
  height: 100%;
  padding: 0px 50px 10px 50px;
`
export default ({ children }) => {
  const { data } = useQuery(IS_LOADED)
  const client = useApolloClient()
  return (
    <Confirm>
      <Header>
        <Title>cumatron</Title>
      </Header>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
        <br />
        <button
          disabled={!data.isLoaded}
          onClick={() => {
            client.writeData({ data: { canSpeak: !data.canSpeak } })
          }}
        >
          {// children
          data.isLoaded ? "vamos!" : "loading..."}
        </button>
      </Text>
    </Confirm>
  )
}
