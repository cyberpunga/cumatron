module.exports = {
  siteMetadata: {
    title: `cumatron`,
    description: `cumatron recitando poemas en el vacío`,
    author: `cyberpunga`,
    author_url: `https://cyberpun.ga`,
  },
  plugins: [
    `gatsby-theme-apollo`,
    `gatsby-plugin-styled-components`,
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
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
