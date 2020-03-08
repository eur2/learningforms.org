import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import Search from '../components/Search';
import Footer from '../components/Footer';
import Button from '../components/Button';

export default class Print extends React.Component {
  state = {
    search: '',
    list: false
  };
  handleView = () => {
    this.setState(prevState => ({
      list: !prevState.list
    }));
  };

  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <Layout>
        <div className="print">
          <main id="archive">
            {posts.map(({ node: post }) => (
              <article
                key={post.id}
                className={this.state.list ? 'list' : 'thumb'}
              >
                <Link to={post.fields.slug}>
                  
                  {post.frontmatter.descriptionEn && (
                    <div className="desc">
                      <p>{post.frontmatter.descriptionEn}</p>
                    </div>
                  )}
                  {post.frontmatter.descriptionFr && (
                    <div className="desc">
                      <p>{post.frontmatter.descriptionFr}</p>
                    </div>
                  )}

                  <div className="details">
                    <div className="item">
                      <div className="label">Title</div>
                      <div className="data">{post.frontmatter.title}</div>
                    </div>
                    <div className="item">
                      <div className="label">School</div>
                      <div className="data">{post.frontmatter.school}</div>
                    </div>
                    <div className="item">
                      <div className="label">Year</div>
                      <div className="data">{post.frontmatter.year}</div>
                    </div>
                    <div className="item">
                      <div className="label">Size</div>
                      <div className="data">{post.frontmatter.dimensions}</div>
                    </div>
                    <div className="item">
                      <div className="label">Pages</div>
                      <div className="data">{post.frontmatter.pages}</div>
                    </div>
                    <div className="item">
                      <div className="label">Teacher</div>
                      <div className="data">
                        <ul>
                          {post.frontmatter.teacher.map((teacher, id) => (
                            <li className="teacher" key={id}>
                              {teacher}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {post.frontmatter.guest && (
                      <div className="item">
                        <div className="label">Guest</div>
                        <div className="data">{post.frontmatter.guest}</div>
                      </div>
                    )}
                    {post.frontmatter.assistant && (
                      <div className="item">
                        <div className="label">Assistant</div>
                        <div className="data">{post.frontmatter.assistant}</div>
                      </div>
                    )}
                    <div className="item">
                      <div className="label">Students</div>
                      <div className="data">{post.frontmatter.student}</div>
                    </div>
                    {post.frontmatter.graphic && (
                      <div className="item">
                        <div className="label">Designer</div>
                        <div className="data">{post.frontmatter.graphic}</div>
                      </div>
                    )}
                  </div>
                </Link>
              </article>
            ))}
          </main>
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query PrintQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      group(field: frontmatter___teacher) {
        fieldValue
        totalCount
      }
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            image {
              childImageSharp {
                sizes(maxWidth: 600, quality: 80) {
                  ...GatsbyImageSharpSizes_noBase64
                }
              }
            }
            year
            school
            dimensions
            pages
            teacher
            guest
            assistant
            student
            graphic
            descriptionEn
            descriptionFr
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
