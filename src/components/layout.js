/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"

import Confirmation from "./confirm"
import Scene from "./scene"

import "./layout.css"
import "orgdot-org-v01"

const Layout = styled.div`
  height: 100%;
`
const Header = styled.header`
  background: rgba(2, 2, 2, 0.98);
  padding: 10px 50px;
`

const Title = styled.h1`
  margin: 0;
  color: white;
  textdecoration: none;
`
const Main = styled.main`
  height: 100%;
  padding: 10px 50px;
`
const Footer = styled.footer`
  position: fixed;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
`
export default ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Layout>
      <Header siteTitle={data.site.siteMetadata.title}>
        <Title>{data.site.siteMetadata.title || ""}</Title>
      </Header>
      <Confirmation />
      <Scene words="lala" />
      <Main>{children}</Main>
      <Footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </Footer>
    </Layout>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
