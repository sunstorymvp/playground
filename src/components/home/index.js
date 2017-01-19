import React from 'react';
import Helmet from 'react-helmet';

const Home = () => (
  <div>
    <Helmet title="Home"
            titleTemplate="%s - Playground" />
    <h1>Hello world!</h1>
    <img src={ require('./assets/images/keep-calm-and-react.png') } />
  </div>
);

export default Home;
