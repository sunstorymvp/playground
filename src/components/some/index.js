import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Some = (props) => (
  <div>
    <Helmet title="Some"
            titleTemplate="%s - Playground" />
    <h1>Hello some!</h1>
    <p>{ props.data.loading ? 'fetching with GraphQL...' : props.data.viewer.login }</p>
    <div>
      {
        props.data.viewer && props.data.viewer.following.edges.map((following) => (
          following.node.starredRepositories.edges.map((repository) => (
            <p key={ repository.node.url }><a href={ repository.node.url }>{ repository.node.url }</a></p>
          ))
        ))
      }
    </div>
  </div>
);

Some.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    viewer: PropTypes.object
  }).isRequired
};

const starredRepositoriesQuery = gql`
  query {
    viewer {
      login,
      following(first: 10) {
        edges {
          node {
            starredRepositories(first: 5) {
              edges {
                node {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;

const MyComponentWithData = graphql(starredRepositoriesQuery)(Some);

export default MyComponentWithData;
