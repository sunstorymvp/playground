import ApolloClient, { createNetworkInterface } from 'apollo-client';

import { GITHUB_GRAPHQL_URL } from './constants.endpoints';
import { GITHUB_AUTH_TOKEN } from './constants.secrets';

const networkInterface = createNetworkInterface({ uri: GITHUB_GRAPHQL_URL });
const auth = {
  applyMiddleware(request, next) {
    request.options.headers = request.options.headers || {};
    request.options.headers.Authorization = `Bearer ${ GITHUB_AUTH_TOKEN }`;
    next();
  }
};

networkInterface.use([ auth ]);

const client = new ApolloClient({ networkInterface });

export default client;
