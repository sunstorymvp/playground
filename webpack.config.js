const path = require('path');
const getModule = require('./webpack.module');
const getPlugins = require('./webpack.plugins');

const { resolve } = path;
const { NODE_ENV } = process.env;

if (!NODE_ENV) {
  throw new Error('NODE_ENV is not set. You should fix it before continue.');
}

module.exports = (env) => ({
  entry: {
    app: resolve('src', 'index.js'),
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-logger',
      'redux-promise',
      'redux-thunk'
    ]
  },
  output: {
    path: resolve('dist'),
    filename: '[name].[hash:6].bundle.js',
    pathinfo: env.development
  },
  resolve: {
    extensions: [ '.js', '.json' ],
    modules: [ 'src', 'node_modules' ]
  },
  module: getModule(env),
  plugins: getPlugins(env),
  devtool: env.development ? 'module-inline-source-map' : false,
  devServer: {
    historyApiFallback: true,
    port: 4000,
    stats: {
      chunkModules: false,
      children: false
    }
  },
  watchOptions: {
    aggregateTimeout: 100
  },
  performance: {
    hints: env.production ? 'warning' : false
  }
});
