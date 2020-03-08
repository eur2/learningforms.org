module.exports = {
//pathPrefix: `/curatorialdesign`,
  siteMetadata: {
    title: 'Learning Forms',
    description:
    'An ongoing archive of publications from studios of architecture schools'
  }, 
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/assets`,
        name: 'assets',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
        name: 'content',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        tableOfContents: {
          heading: null,
          maxDepth: 2,
        },
        plugins: [
          /*{
            resolve: `gatsby-plugin-netlify-cms-paths`,
            options: {
              cmsConfig: `/static/admin/config.yml`
            } 
          },*/
          // {
          //   resolve: `gatsby-remark-autolink-headers`,
          //   options: {
          //     icon: false
          //   },
          // },
          {
            resolve: `gatsby-remark-relative-images`,
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 2400,
              quality: 80,
              showCaptions: true,
              backgroundColor: 'transparent',
              linkImagesToOriginal: false,
              disableBgImage: true,
              wrapperStyle: 'z-index:-1;'
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Learning Forms',
        short_name: 'LF',
        start_url: '/',
         display: 'minimal-ui',
        icon: 'src/assets/MAOP.svg'
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    'gatsby-plugin-preact',
  ],
};
