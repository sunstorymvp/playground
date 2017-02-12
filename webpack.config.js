const path = require('path');
const getModule = require('./webpack.module');
const getPlugins = require('./webpack.plugins');

const { resolve } = path;
const { NODE_ENV } = process.env;

if (!NODE_ENV) {
  throw new Error('NODE_ENV is not set. You should fix it before continue.');
} else if (![ 'development', 'production', 'test' ].includes(NODE_ENV)) {
  throw new Error(`"${ NODE_ENV }" is not a valid NODE_ENV value!`);
}

module.exports = (env) => ({
  entry: {
    polyfill: resolve('src', 'config', 'polyfill.js'),
    vendor: resolve('src', 'config', 'vendor.js'),
    app: resolve('src', 'index.js')
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
    modules: [ resolve('src'), 'node_modules' ]
  },
  module: getModule(env),
  plugins: getPlugins(env),
  devtool: env.development && 'inline-source-map',
  devServer: {
    compress: true,
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
    aggregateTimeout: 100,
    ignored: /node_modules/
  },
  performance: {
    // disable because minification handled outside of webpack
    hints: false
  }
});
