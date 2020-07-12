import React from "react"
import { useStaticQuery, graphql, navigate } from "gatsby"
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
        height: `100%`,
        margin: "0 auto",
        display: `flex`,
        flexDirection: `column`,
        position: "relative",
      }}
    >
      <header
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          zIndex: 1,
          background: "#111111",
          color: "#eeeeee",
        }}
      >
        <h1
          onClick={() => navigate("/")}
          style={{
            flex: 1,
            margin: "8px",
            padding: "0 8px",
            cursor: "pointer",
          }}
        >
          {title}
        </h1>
        <a href="https://t.me/cumatron_bot" target="_blank" rel="noreferrer">
          <MessageSquare style={{ marginRight: "8px" }} />
        </a>
        <a href="/book" target="_blank" rel="noreferrer">
          <Book style={{ marginRight: "8px" }} />
        </a>
      </header>
      <main
        style={{
          flex: 1,
          position: "relative",
          height: "100%",
        }}
      >
        {children}
      </main>
      <footer style={{ zIndex: 1 }}>
        <p
          style={{
            margin: "8px",
            padding: "0 8px",
            color: "#eeeeee",
            fontSize: 12,
          }}
        >
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
