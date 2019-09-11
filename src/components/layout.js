import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import "orgdot-org-v01"

import Scene from "../components/scene"
import Speak from "../components/speak"
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

  return (
    <Layout>
      <Scene />
      <Speak />
      <Heading>{title}</Heading>
      <Main>{children}</Main>
      <Footer>
        © {new Date().getFullYear()}, <a href={author_url}>{author}</a>
      </Footer>
    </Layout>
  )
}
