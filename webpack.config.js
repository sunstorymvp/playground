const path = require('path');

const getModule = require('./webpack.module');
const getPlugins = require('./webpack.plugins');
const getDevServer = require('./webpack.dev-server');

const { NODE_ENV } = process.env;

if (!NODE_ENV) {
  throw new Error('NODE_ENV is not set. You should fix it before continue.');
} else if (![ 'development', 'production', 'test' ].includes(NODE_ENV)) {
  throw new Error(`"${ NODE_ENV }" is not a valid NODE_ENV value!`);
}

module.exports = (env) => ({
  entry: {
    polyfill: path.resolve('src', 'config', 'polyfill.js'),
    vendor: path.resolve('src', 'config', 'vendor.js'),
    app: path.resolve('src', 'index.js')
  },
  output: {
    path: path.resolve('dist'),
    filename: env.production ? '[name].[chunkhash:6].bundle.js' : '[name].bundle.js',
    chunkFilename: env.production ? '[id].[chunkhash:6].chunk.js' : '[id].chunk.js',
    pathinfo: env.development,
    publicPath: '/'
  },
  resolve: {
    modules: [
      path.resolve('src'),
      'node_modules'
    ]
  },
  module: getModule(env),
  plugins: getPlugins(env),
  devtool: env.development && 'inline-source-map',
  devServer: getDevServer(),
  watchOptions: {
    aggregateTimeout: 100,
    ignored: /node_modules/
  },
  performance: {
    hints: false
  }
});
