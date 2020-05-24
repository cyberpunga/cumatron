import React from "react"
import { useStaticQuery, graphql } from "gatsby"

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
    <div style={{ height: "100%" }}>
      <h1 style={{ position: "absolute", margin: "24px", zIndex: 100 }}>
        {title}
      </h1>
      {children}
      <footer style={{ position: "absolute", margin: "24px", bottom: 8 }}>
        © {new Date().getFullYear()}, <a href={author_url}>{author}</a>
      </footer>
    </div>
  )
}
