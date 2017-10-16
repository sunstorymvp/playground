const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env) => {
  const html = new HtmlWebpackPlugin({
    // filename (unix) relative to config output.path
    filename: 'index.html',
    template: path.join('src', 'index.html'),
    inject: true,
    minify: env.production ? {
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeComments: true,
      removeOptionalTags: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    } : false
  });
  const webpackCommonsChunk = new webpack.optimize.CommonsChunkPlugin({
    filename: env.production ? '[name].[chunkhash:6].bundle.js' : '[name].bundle.js',
    names: [ 'app', 'vendor', 'polyfill', 'webpack' ]
  });
  const npmCommonsChunk = new webpack.optimize.CommonsChunkPlugin({
    filename: env.production ? '[name].[chunkhash:6].bundle.js' : '[name].bundle.js',
    name: 'vendor',
    chunks: [ 'app', 'vendor' ],
    minChunks: (module) => /node_modules/.test(module.resource)
  });
  const asyncCommonsChunk = new webpack.optimize.CommonsChunkPlugin({
    name: 'app',
    async: true
  });
  const styles = new ExtractTextPlugin({
    filename: env.production ? '[name].[contenthash:6].bundle.css' : '[name].bundle.css',
    disable: env.development || env.test,
    allChunks: true
  });
  const analyzer = new BundleAnalyzerPlugin({
    reportFilename: path.join('..', 'webpack_analyzer_report.html'),
    analyzerMode: 'static'
  });
  const minifyImages = new ImageminPlugin({
    disable: env.development || env.test
  });
  const environment = new webpack.EnvironmentPlugin([ 'NODE_ENV' ]);
  const noEmitOnErrors = new webpack.NoEmitOnErrorsPlugin();
  const notifier = new WebpackNotifierPlugin();
  const clearBuildFolders = new CleanWebpackPlugin([ path.resolve('dist') ]);
  const namedModules = new webpack.NamedModulesPlugin();
  const uglifyJsPlugin = new UglifyJsPlugin();

  // note - keep order for CommonsChunk definitions.
  const plugins = [
    html,
    styles,
    minifyImages,
    webpackCommonsChunk,
    npmCommonsChunk,
    asyncCommonsChunk,
    environment,
    noEmitOnErrors,
    clearBuildFolders,
    namedModules
  ];

  if (env.development) {
    plugins.push(notifier);
  }

  if (env.production) {
    plugins.push(uglifyJsPlugin);
  }

  if (env.analyze) {
    plugins.push(analyzer);
  }

  return plugins;
};
