import React from "react"
import { Link } from "gatsby"
import { Sky } from "drei"

import SEO from "../components/seo"
import Layout from "../components/layout"

const NotFoundPage = () => {
  return (
    <Layout>
      <SEO title="404 :(" />
      <h1>NOT FOUND</h1>
      <p>You just hit a route that does not exist... the sadness.</p>
      <Link to="/">lala</Link>
      <Sky />
    </Layout>
  )
}

export default NotFoundPage
