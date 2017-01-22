import ApolloClient, { createNetworkInterface } from 'apollo-client';

import { GITHUB_GRAPHQL } from './constants.endpoints';

const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: GITHUB_GRAPHQL })
});

export default apolloClient;
