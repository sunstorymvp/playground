import React, { PropTypes } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';

import AppRouter from './app-router';

const App = ({ store, browserHistory, apolloClient }) => (
  <ApolloProvider store={ store } client={ apolloClient }>
    <AppRouter browserHistory={ browserHistory } />
  </ApolloProvider>
);

App.propTypes = {
  store: PropTypes.object.isRequired,
  browserHistory: PropTypes.object.isRequired,
  apolloClient: PropTypes.instanceOf(ApolloClient).isRequired
};

export default App;
