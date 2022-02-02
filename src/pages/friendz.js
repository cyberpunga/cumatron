import React from "react"
import { graphql } from "gatsby"

import SEO from "../components/seo"
import Layout from "../components/layout"

function Friendz({ data }) {
  return (
    <Layout>
      <SEO title="Friendz" />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Layout>
  )
}

export default Friendz

export const query = graphql`
  query MyQuery {
    allCloudinaryMedia(sort: { fields: created_at, order: DESC }) {
      nodes {
        id
        secure_url
        created_at
      }
    }
  }
`
