import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import _ from 'lodash';
import Img from 'gatsby-image';
import Search from '../components/Search';
import Footer from '../components/Footer';
import Button from '../components/Button';
//import { get, uniq } from 'lodash';
import maop from '../assets/MAOP.svg';
import isdat from '../assets/isdaT-logo-BA.svg';
import ensat from '../assets/ENSAT-FR.svg';

function FilterButton(props) {
  return (
    <button onClick={() => props.handleCategoryUpdate(props.tag)}>
      {props.tag || '×'}
    </button>
  );
}

export default class Index extends React.Component {
  state = {
    search: '',
    tag: '',
    list: false
  };

  handleTags = e => {
    this.setState({
      tag: e
    });
  };

  handleSearch = event => {
    this.setState({ search: event.target.value });
  };

  reset = () => {
    this.setState({
      search: '',
      tag: ''
    });
  };
  handleView = () => {
    this.setState(prevState => ({
      list: !prevState.list
    }));
  };

  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    const { group: groupTeacher } = data.allMarkdownRemark;
    const { tag, search } = this.state;

    let yeartags = [];
    let schooltags = [];
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach(edge => {
      if (_.get(edge, `node.frontmatter.year` || `node.frontmatter.school`)) {
        yeartags = yeartags.concat(edge.node.frontmatter.year);
        schooltags = schooltags.concat(edge.node.frontmatter.school);
      }
    });
    const yearList = _.uniq(yeartags);
    yearList.sort();

    const schoolList = _.uniq(schooltags);
    schoolList.sort();

    const filteredCategory = posts.filter(({ node: post }) => {
      let tags = post.frontmatter.teacher;
      tags.push(post.frontmatter.year);
      tags.push(post.frontmatter.school);
      tags.push(post.frontmatter.graphic);
      function isTag(e) {
        return e === tag;
      }
      if (tag === '') {
        return true;
      } else if (tags.some(isTag) === true) {
        return true;
      } else return false;
    });

    const filteredSearch = filteredCategory.filter(({ node: post }) => {
      return (
        post.frontmatter.school.toLowerCase().indexOf(search) !== -1 ||
        post.frontmatter.teacher
          .toString()
          .toLowerCase()
          .indexOf(search) !== -1 ||
        post.frontmatter.year.toLowerCase().indexOf(search) !== -1 ||
        post.frontmatter.title.toLowerCase().indexOf(search) !== -1
      );
    });

    return (
      <Layout>
        <div className="index">
          <header className="header">
            <Button
              title={
                <h1>
                  Learning Forms<br />An ongoing archive of publications from
                  studios of architecture schools
                </h1>
              }
              content={
                <div>
                  <p>
                    <span>
                      Led by{' '}
                      <a
                        href="https://martinezbaratlafore.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Sébastien Martinez-Barat
                      </a>{' '}
                      with{' '}
                      <a
                        href="https://eurogroupe.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Grégory Dapra, Laure Giletti
                      </a>,{' '}
                      <a
                        href="https://martinezbaratlafore.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Benjamin Lafore
                      </a>, Cédric Libert.{' '}
                    </span>
                    <a href="https://learningforms.org/">Learning Forms</a> is a
                    project by{' '}
                    <a
                      href="http://www.maisonarchitecture-mp.org"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      la Maison de l’Architecture Occitanie—Pyrénées.
                    </a>
                    <br />
                    www.learningforms.org
                  </p>
                  <p className="logo">
                    <a
                      href="http://www.maisonarchitecture-mp.org"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={maop} alt="MAOP" />
                    </a>
                    {/*<a
                      href="http://www.toulouse.archi.fr"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={ensat} alt="ensat" />
                    </a>*/}
                  </p>
                </div>
              }
            />
            <Button
              title={
                <h2>
                  22 mai—16 juin 2019<br />École Nationale Supérieure d'Architecture de Toulouse
                </h2>
              }
              content={
                <div>
                  <p>
                    <a
                      href="https://maps.google.com/maps?rlz=1CDGOYI_enFR758FR758&hl=fr&um=1&ie=UTF-8&fb=1&gl=fr&entry=s&sa=X&ftid=0x12aeba4fb16d2bdb:0x74722d90d127bff1&gmm=CgIgAQ%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      83 Rue Aristide Maillol, Toulouse
                    </a>
                    <br />
                    Exposition ouverte du lundi au vendredi de 8h à 20h.
                  </p>
                  <p className="logo">
                  {/*<a
                      href="http://www.toulouse.archi.fr"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img className="logo-right" src={ensat} alt="ensat" />
                  </a>*/}
                    <a
                      href="http://www.toulouse.archi.fr"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={ensat} alt="ensat" />
                    </a>
                  </p>
                </div>
              }
            />
          </header>
          <div className="front">
            <div>
              {schoolList.map(item => {
                return (
                  <FilterButton
                    key={item}
                    handleCategoryUpdate={this.handleTags}
                    tag={item}
                  />
                );
              })}
            </div>
            <div>
              {groupTeacher.map(item => {
                return (
                  <FilterButton
                    key={item.fieldValue}
                    handleCategoryUpdate={this.handleTags}
                    tag={item.fieldValue}
                  />
                );
              })}
            </div>
            <div>
              {yearList.map(item => {
                return (
                  <FilterButton
                    key={item}
                    handleCategoryUpdate={this.handleTags}
                    tag={item}
                  />
                );
              })}
            </div>
          </div>

          <nav className="sticky">
            <div className="left post">
              <FilterButton handleCategoryUpdate={this.reset} tag="×" />

              <Search onChange={this.handleSearch} value={this.state.search} />
            </div>

            <div className="right post">
              <button onClick={this.handleView}>
                {this.state.list ? 'Thumbnails' : 'Index'}
              </button>{' '}
            </div>
          </nav>
          <main id="archive">
            {filteredSearch.map(({ node: post }) => (
              <article
                key={post.id}
                className={this.state.list ? 'list' : 'thumb'}
              >
                <Link to={post.fields.slug}>
                  {this.state.list ? (
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
                          flex: '4',
                          paddingRight: '1rem'
                        }}
                      >
                        {post.frontmatter.title}
                      </h4>
                      <h4
                        style={{
                          flex: '4'
                        }}
                      >
                        {post.frontmatter.school}
                      </h4>
                      {/*<div
                      style={{
                        flex: '4'
                      }}
                    >
                      {post.frontmatter.teacher}
                    </div>*/}
                    </header>
                  ) : (
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
                  )}
                </Link>
              </article>
            ))}
          </main>
          <Footer />
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query IndexQuery {
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
            teacher
            student
            graphic
            descriptionEn
            dimensions
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
