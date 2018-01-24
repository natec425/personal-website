module.exports = {
    siteMetadata: {
        title: 'Nate Clark'
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        {
            resolve: 'gatsby-plugin-typography',
            options: {
                pathToConfigModule: 'src/utils/typography.js'
            }
        }
    ]
};
