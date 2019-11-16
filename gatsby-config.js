module.exports = {
  siteMetadata: {
    title: "Nate Clark",
    siteUrl: "https://nateclark.io"
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography.js"
      }
    },
    "gatsby-plugin-robots-txt",
    {
      resolve: "gatsby-plugin-fathom",
      options: {
        trackingUrl: "mighty-basin-39306.herokuapp.com",
        siteId: "PMPVP"
      }
    }
  ]
};
