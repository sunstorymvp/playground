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
    polyfill: resolve('src', 'config', 'polyfill.js'),
    vendor: [
      'normalize.css'
    ]
  },
  output: {
    path: resolve('dist'),
    publicPath: '/',
    filename: env.production ? '[name].[chunkhash:6].bundle.js' : '[name].bundle.js',
    chunkFilename: env.production ? '[id].[chunkhash:6].chunk.js' : '[id].chunk.js',
    pathinfo: env.development
  },
  resolve: {
    extensions: [ '.js', '.json' ],
    modules: [ 'src', 'node_modules' ]
  },
  module: getModule(env),
  plugins: getPlugins(env),
  devtool: env.development && 'module-inline-source-map',
  devServer: {
    historyApiFallback: true,
    port: 4000,
    stats: {
      chunks: false,
      children: false,
      hash: false,
      timings: false,
      version: false
    }
  },
  watchOptions: {
    aggregateTimeout: 100
  },
  performance: {
    // disable because minification handled outside of webpack
    hints: false
  }
});
