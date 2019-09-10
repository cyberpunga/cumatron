import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import styled from "styled-components"

import "orgdot-org-v01"
// import "./layout.css"

import Scene from "../components/scene"
import Heading from "../components/heading"
import Main from "../components/main"
import Footer from "../components/footer"

const SITE = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
        author
        author_url
      }
    }
  }
`

const IS_LOADED = gql`
  query CanSpeak {
    canSpeak @client
    isLoaded @client
    words @client
  }
`

const Layout = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 8px;
`

export default ({ children }) => {
  const {
    site: {
      siteMetadata: { title, author, author_url },
    },
  } = useStaticQuery(SITE)
  const { data } = useQuery(IS_LOADED)

  return (
    <Layout>
      <Scene words={data.words} />

      <Heading>{title}</Heading>

      <Main>{children}</Main>

      <Footer>
        © {new Date().getFullYear()}, <a href={author_url}>{author}</a>
      </Footer>
    </Layout>
  )
}
