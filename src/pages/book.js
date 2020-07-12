import React from "react"

import SEO from "../components/seo"
import Layout from "../components/layout"

const BookPage = () => {
  return (
    <Layout>
      <SEO title="dame un pdf" />
      <iframe
        title="cumatron book"
        src="/.netlify/functions/book"
        style={{
          border: "none",
          height: "100%",
          width: "100%",
        }}
      />
    </Layout>
  )
}

export default BookPage
