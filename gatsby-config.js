require("dotenv").config()

module.exports = {
  pathPrefix: `/cumatron`,
  siteMetadata: {
    title: `cumatron`,
    description: `cumatron recitando poemas en el vacío`,
    author: `cyberpunga`,
    author_url: `https://cyberpun.ga`,
  },
  plugins: [
    `gatsby-theme-apollo`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `cumatron`,
        short_name: `cumatron`,
        start_url: `/`,
        background_color: `#111111`,
        theme_color: `#111111`,
        display: `minimal-ui`,
        icon: `src/images/cumi-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-cloudinary`,
      options: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        // resourceType: `image`,
        // prefix: `/`,
        // type: `type Value`,
        maxResults: 10,
        direction: 2,
        // start_at: "2022-01-29",
        // tags:`fetch image tags?`,
      },
    },
  ],
}
