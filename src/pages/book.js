import React from "react"

import SEO from "../components/seo"
import Layout from "../components/layout"

const BookPage = () => {
  return (
    <Layout>
      <SEO title="bookz" />
      <iframe
        width="100%"
        height="100%"
        src="https://cumatron.win/book"
        title="CUMATRON.PDF"
      ></iframe>
    </Layout>
  )
}

export default BookPage
