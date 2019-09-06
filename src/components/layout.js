/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Transition } from "react-transition-group"
import styled from "styled-components"

import "./layout.css"
import "orgdot-org-v01"

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

const Confirmation = styled.div`
  /* base style */
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #000000;
  text-align: center;
  font-family: "Org_v01";
  /* animation */
  transition: 0.5s;
  opacity: ${({ state }) => (state === "entered" ? 1 : 0)};
`

const Text = styled.div`
  color: #fefefe;
  text-align: justify;
  padding: 50px;
`

const Button = styled.button`
  background: rgba(0, 0, 0, 0);
  color: #fefefe;
  margin-bottom: 50px;
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
export default ({ children }) => {
  const [val, setVal] = useState(true)
  const handleClick = () => setVal(!val)

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
      <Transition in={val} timeout={500}>
        {state => (
          <>
            <Header state={state}>
              <Title state={state}>{data.site.siteMetadata.title || ""}</Title>
            </Header>

            <Confirmation state={state}>
              <Header state={state}>
                <Title state={state}>
                  {data.site.siteMetadata.title || ""}
                </Title>
              </Header>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
              <Button onClick={handleClick}>OK!</Button>
            </Confirmation>

            <Footer state={state}>
              © {new Date().getFullYear()},{" "}
              <a href="https://cyberpun.ga">cyberpunga</a>
            </Footer>
          </>
        )}
      </Transition>
      <Main>{children}</Main>
    </Layout>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
