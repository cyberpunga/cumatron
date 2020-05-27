import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { MessageSquare, Book } from "react-feather"

import "orgdot-org-v01"
import "./layout.css"

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

export default ({ children }) => {
  const {
    site: {
      siteMetadata: { title, author, author_url },
    },
  } = useStaticQuery(SITE)

  return (
    <div
      style={{
        width: "100%",
        margin: "0 auto",
        display: `flex`,
        flexDirection: `column`,
        minHeight: `100vh`,
      }}
    >
      <header
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          zIndex: 1,
          background: "#000000",
          color: "#ffffff",
        }}
      >
        <h1
          style={{
            flex: 1,
            margin: "8px",
            padding: "0 8px",
          }}
        >
          {title}
        </h1>
        <MessageSquare style={{ marginRight: "8px" }} />
        <Book style={{ marginRight: "8px" }} />
      </header>
      <main
        style={{
          flex: 1,
        }}
      >
        {children}
      </main>
      <footer style={{ zIndex: 1 }}>
        <p style={{ margin: "8px", padding: "0 8px" }}>
          © {new Date().getFullYear()}, Hecho en
          {` `}
          <a style={{ textDecoration: "none" }} href={author_url}>
            {author}
          </a>
        </p>
      </footer>
    </div>
  )
}
