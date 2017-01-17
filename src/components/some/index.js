import React from 'react';
import Helmet from 'react-helmet';

const Some = () => (
  <div>
    <Helmet title="Some"
            titleTemplate="%s - Playground" />
    <h1>Hello some!</h1>
  </div>
);

export default Some;
