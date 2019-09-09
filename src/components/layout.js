/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import styled from "styled-components"

import "./layout.css"
import "orgdot-org-v01"

import Confirm from "./confirm"
import Scene from "../components/scene"

const Layout = styled.div`
  height: 100%;
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

const Main = styled.main`
  height: 100%;
  padding: 0px 50px 10px 50px;
`
const Footer = styled.footer`
  text-align: center;
  position: fixed;
  /* left: 50%; */
  width: 100%;
  bottom: 10px;
  transition: 0.5s;
  /* transform: translateX(-50%); */
  /* opacity: ${({ state }) => (state === "entered" ? 0 : 1)}; */
  color: ${({ state }) =>
    state === "entered" ? "#fefefe" : "rgba(0, 0, 0, 0.8)"};
`

const IS_LOADED = gql`
  query CanSpeak {
    canSpeak @client
    isLoaded @client
    words @client
  }
`

export default ({ children }) => {
  const { site } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const { data } = useQuery(IS_LOADED)

  return (
    <Layout>
      <Scene words={data.words} />
      {!data.canSpeak && <Confirm title={site.siteMetadata.title} />}
      <Header>
        <Title>{site.siteMetadata.title || ""}</Title>
      </Header>
      <Main>{children}</Main>
      <Footer>
        © {new Date().getFullYear()},{" "}
        <a href="https://cyberpun.ga">cyberpunga</a>
      </Footer>
    </Layout>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
