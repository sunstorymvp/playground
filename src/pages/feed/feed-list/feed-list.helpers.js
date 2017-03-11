import { omit } from 'lodash';
import { v4 } from 'uuid';
import moment from 'moment';

export const mapDataToGithubUsers = (data) => (
  data.reduce((result, { user }) => {
    const { nodes } = user.following;

    nodes.forEach((followingNode) => (
      result[followingNode.id] = omit(followingNode, '__typename', 'starredRepositories')
    ));

    return result;
  }, {})
);

export const mapDataToGithubRepositories = (data) => (
  data.reduce((result, { user }) => {
    const { nodes } = user.following;

    nodes.forEach((followingNode) => (
      followingNode.starredRepositories.edges.forEach(({ node }) => (
        result[node.id] = omit(node, '__typename')
      ))
    ));

    return result;
  }, {})
);

export const mapDataToFeedList = (data) => {
  const yesterday = moment().subtract(1, 'days');

  return data.reduce((result, { user }) => {
    const { nodes } = user.following;

    nodes.forEach((followingNode) => (
      followingNode.starredRepositories.edges.forEach(({ starredAt, node }) => {
        const starredDate = moment(starredAt);
        const isFresh = starredDate - yesterday > 0;

        if (isFresh) {
          const id = v4();

          result[id] = {
            userId: followingNode.id,
            repositoryId: node.id,
            starredAt,
            id
          };
        }
      })
    ));

    return result;
  }, {});
};
