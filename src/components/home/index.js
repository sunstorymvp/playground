import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

const Home = () => (
  <div>
    <Helmet title="Home"
            titleTemplate="%s - Playground" />
    <h1>Hello world!</h1>
    <Link to="/some">to some</Link>
    <img src={ require('./assets/images/keep-calm-and-react.png') } />
  </div>
);

export default Home;
