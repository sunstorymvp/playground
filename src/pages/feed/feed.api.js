import client from 'config/apollo';
import feedQuery from './feed.query.graphql';

export const initFeedQuery = async (variables, data = []) => {
  const result = await client.query({
    query: feedQuery,
    variables
  });

  data.push(result.data);

  const { hasNextPage, endCursor } = result.data.user.following.pageInfo;

  return hasNextPage ? initFeedQuery({ ...variables, followingCursor: endCursor }, data) : data;
};
