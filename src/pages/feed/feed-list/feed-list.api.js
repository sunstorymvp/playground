import client from 'config/apollo';
import feedListQuery from './feed-list.query.graphql';

export const initFeedListQuery = async (variables, data = []) => {
  const result = await client.query({
    query: feedListQuery,
    variables
  });

  data.push(result.data);

  const { hasNextPage, endCursor } = result.data.user.following.pageInfo;

  return hasNextPage ? initFeedListQuery({ ...variables, followingCursor: endCursor }, data) : data;
};
