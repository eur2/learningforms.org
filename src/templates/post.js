import React from 'react';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/layout';

import Footer from '../components/Footer';
import Button from '../components/Button';

import './post.css';

export default props => {
  const { markdownRemark: post } = props.data;
  const { allMarkdownRemark: posts } = props.data;
  const school = post.frontmatter.school;
  //const teacher = post.frontmatter.teacher;

  return (
    <Layout>
      <div className="post" id="top">
        <Helmet>
          <title>{`${post.frontmatter.title} | Learning Forms`}</title>
          <meta
            name="description"
            content={
              post.frontmatter.descriptionEn
                ? post.frontmatter.descriptionEn
                : post.excerpt
            }
          />
          <meta
            name="og:description"
            content={post.frontmatter.descriptionEn}
          />
          <meta
            name="twitter:description"
            content={post.frontmatter.descriptionEn}
          />
          <meta
            name="og:title"
            content={`${post.frontmatter.title} | Learning Forms`}
          />
          {post.frontmatter.image && (
            <meta
              name="og:image"
              content={`https://learningforms.org${
                post.frontmatter.image.childImageSharp.resize.src
              }`}
            />
          )}
          <meta
            name="twitter:title"
            content={`${post.frontmatter.title} | Learning Forms`}
          />
          {post.frontmatter.image && (
            <meta
              name="twitter:image"
              content={`https://learningforms.org${
                post.frontmatter.image.childImageSharp.resize.src
              }`}
            />
          )}
        </Helmet>

        <header className="sticky">
          {/*<span className="dot">●</span>001*/}
          <h1>
            <Link to="#top">{post.frontmatter.title}</Link>
          </h1>
          <p className="nav">
            <Link to={'/#archive'}>×</Link>
          </p>
        </header>
        <main>
          <article>
            <div className="tags">
              {post.frontmatter.teacher.map(teacher => (
                <Button
                  key={teacher}
                  title={teacher}
                  content={
                    posts
                      ? posts.edges
                          .filter(
                            post =>
                              post.node.frontmatter.teacher.toString() ===
                              teacher
                          )
                          .map(({ node: post }) => (
                            <article key={post.fields.slug} className="list">
                              <Link to={post.fields.slug}>
                                <header>
                                  <h4
                                    style={{
                                      flex: '1'
                                    }}
                                  >
                                    {post.frontmatter.year}
                                  </h4>
                                  <h4
                                    style={{
                                      flex: '4'
                                    }}
                                  >
                                    {post.frontmatter.title}
                                  </h4>
                                </header>
                              </Link>
                            </article>
                          ))
                      : null
                  }
                />
              ))}
              <Button
                title={post.frontmatter.school}
                content={
                  posts
                    ? posts.edges
                        .filter(post => post.node.frontmatter.school === school)
                        .map(({ node: post }) => (
                          <article key={post.fields.slug} className="list">
                            <Link to={post.fields.slug}>
                              <header>
                                <h4
                                  style={{
                                    flex: '1'
                                  }}
                                >
                                  {post.frontmatter.year}
                                </h4>
                                <h4
                                  style={{
                                    flex: '4'
                                  }}
                                >
                                  {post.frontmatter.title}
                                </h4>
                              </header>
                            </Link>
                          </article>
                        ))
                    : null
                }
              />
            </div>

            {/*
              <div className="tag">
                post.frontmatter.tags && post.frontmatter.tags.length ? (
                  <ul className="taglist">
                    {post.frontmatter.tags.map(tag => (
                      <li key={tag + `tag`} className="tag">
                        <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                      </li>
                    ))}
                  </ul>
                ) : null
              </div>*/}
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
                <div className="label">Dimensions</div>
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
                    {post.frontmatter.teacher.map(teacher => (
                      <li className="teacher" key={teacher}>
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
            <div className="cover">
              <Img
                sizes={post.frontmatter.image.childImageSharp.sizes}
                style={{
                  maxWidth: '100%'
                }}
              />
            </div>
            <div
              className="post-content"
              style={{
                maxWidth: '100%'
              }}
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </article>
        </main>
        <nav>
          <h2>See also:</h2>
          {posts
            ? posts.edges
                .filter(post => post.node.frontmatter.school === school)
                .map(({ node: post }) => (
                  <article key={post.fields.slug} className="thumb">
                    <Link to={post.fields.slug}>
                      <header>
                        <Img
                          sizes={post.frontmatter.image.childImageSharp.sizes}
                          style={{
                            maxWidth: '100%',
                            marginBottom: '.6rem'
                          }}
                        />
                        <h4>{post.frontmatter.title}</h4>
                      </header>
                      {/*<div>
                        <Img
                          sizes={post.frontmatter.image.childImageSharp.sizes}
                          style={{
                            maxWidth: '400px',
                            margin: 'auto'
                          }}
                        />
                      </div>*/}
                    </Link>
                  </article>
                ))
            : null}
        </nav>
        {/*<div className="navigation">
        {next && (
          <Link className="next" to={next.fields.slug}>
            ←
          </Link>
        )}
        {prev && (
          <Link className="prev" to={prev.fields.slug}>
            →
          </Link>
        )}
      </div>*/}
        <Footer />
      </div>
    </Layout>
  );
};

/*(filter: { frontmatter: { teacher: { regex: $name } } })*/

export const postQuery = graphql`
  query PostByID($id: String) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt
      fields {
        slug
      }
      frontmatter {
        title
        image {
          childImageSharp {
            resize {
              src
            }
            sizes(maxWidth: 2000, quality: 85) {
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
    allMarkdownRemark(
      limit: 100
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            year
            teacher
            school
            image {
              childImageSharp {
                sizes(maxWidth: 600, quality: 80) {
                  ...GatsbyImageSharpSizes_noBase64
                }
              }
            }
          }
        }
      }
    }
  }
`;
