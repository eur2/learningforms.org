const _ = require('lodash');
const path = require(`path`)
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')
const webpack = require ('webpack');

exports.createPages = ({ actions, graphql }) => {
	const { createPage } = actions;
  
	return graphql(`
	  {
		allMarkdownRemark(limit: 1000) {
		  edges {
			node {
			  id
			  fields {
				slug
			  }
			  frontmatter {
				teacher
				templateKey
			  }
			}
		  }
		}
	  }
	`).then(result => {
	  if (result.errors) {
		result.errors.forEach(e => console.error(e.toString()));
		return Promise.reject(result.errors);
	  }
  
	  const posts = result.data.allMarkdownRemark.edges;
  
	  posts.forEach(edge => {
		const id = edge.node.id;
		createPage({
		  path: edge.node.fields.slug,
		  tags: edge.node.frontmatter.teacher,
		  component: path.resolve(
			`src/templates/${String(edge.node.frontmatter.templateKey)}.js`
		  ),
		  // additional data can be passed via context
		  context: {
			id
		  }
		});
	  });
  
	  // Tag pages:
	  let tags = [];
	  // Iterate through each post, putting all found tags into `tags`
	  posts.forEach(edge => {
		if (_.get(edge, `node.frontmatter.teacher`)) {
		  tags = tags.concat(edge.node.frontmatter.teacher);
		}
	  });
	  // Eliminate duplicate tags
	  tags = _.uniq(tags);
  
	  // Make tag pages
	  tags.forEach(tag => {
		const tagPath = `/tags/${_.kebabCase(tag)}/`;
  
		createPage({
		  path: tagPath,
		  component: path.resolve(`src/templates/tags.js`),
		  context: {
			tag
		  }
		});
	  });
	});
  };

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions
	fmImagesToRelative(node) // convert image paths for gatsby images
  
	if (node.internal.type === `MarkdownRemark`) {
	  const value = createFilePath({ node, getNode })
	  createNodeField({
		name: `slug`,
		node,
		value,
	  })
	}
  }

    exports.onCreateWebpackConfig = ({ stage, actions }) => {
	if (![`develop`, `build-javascript`].includes(stage)) {
	  return Promise.resolve();
	}
	actions.setWebpackConfig({
	  plugins: [
		new webpack.IgnorePlugin({
		  resourceRegExp: /^netlify-identity-widget$/,
		}),
	  ],
	});
  };



//   const puppeteer = require('puppeteer');
// async function timeout(ms) {
// 	return new Promise(resolve => setTimeout(resolve, ms));
//   }
// async function pdf (pathh){
// 	const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(`https://epic-shockley-54087c.netlify.com/${pathh}/`, {waitUntil: 'networkidle2'});
//   await page.evaluate(() => {
// 	window.scrollBy(0, window.innerHeight);
//   })
//   await timeout(5000)

//   await page.pdf({
//     path: `public/pdf/${pathh}.pdf`,
// 	format: 'A4',
// });

//   await browser.close()
// }
// pdf('info')

// async function createBlogPostPages (graphql, actions, reporter) {
// 	const { createPage } = actions
// 	const result = await graphql(`
// 	  {
// 		allSanityPost(filter: { slug: { current: { ne: null } } }) {
// 		  edges {
// 			node {
// 			  id
// 			  publishedAt
// 			  slug {
// 				current
// 			  }
// 			}
// 		  }
// 		}
// 	  }
// 	`)
  
// 	if (result.errors) throw result.errors
  
// 	const postEdges = (result.data.allSanityPost || {}).edges || []
  
// 	postEdges.forEach((edge, index) => {
// 	  const { id, slug = {}, publishedAt } = edge.node
// 	  const path = `/${slug.current}/`
  
// 	  reporter.info(`Creating blog post page: ${path}`)
  
// 	  createPage({
// 		path,
// 		component: require.resolve('./src/templates/post.js'),
// 		context: { id }
// 	  })
// 		pdf(slug.current)

// 	})
//   }
//   exports.createPages = async ({ graphql, actions, reporter }) => {
// 	await createBlogPostPages(graphql, actions, reporter)
//   }