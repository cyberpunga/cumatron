import React from "react"
import { Link } from "gatsby"
import { HTML, Sky } from "drei"

import SEO from "../components/seo"
import Layout from "../components/layout"

const NotFoundPage = () => {
  const isSSR = typeof window === "undefined"

  return (
    <Layout>
      <SEO title="404 :(" />
      {!isSSR && (
        <HTML center style={{ width: 400 }}>
          <h1>NOT FOUND</h1>
          <p>You just hit a route that does not exist... the sadness.</p>
          <Link to="/">lala</Link>
        </HTML>
      )}
      <Sky />
    </Layout>
  )
}

export default NotFoundPage
