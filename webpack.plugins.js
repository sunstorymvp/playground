const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const { join, resolve } = path;

module.exports = (env) => {
  const html = new HtmlWebpackPlugin({
    // filename (unix) relative to config output.path
    filename: 'index.html',
    template: join('src', 'index.html'),
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
  const commons = new webpack.optimize.CommonsChunkPlugin({
    // filename relative to config output.path
    filename: env.production ? '[name].[chunkhash:6].bundle.js' : '[name].bundle.js',
    names: [ 'polyfill', 'vendor', 'webpack' ],
    minChunks: 2
  });
  const styles = new ExtractTextPlugin({
    // filename relative to config output.path
    filename: env.production ? '[name].[contenthash:6].bundle.css' : '[name].bundle.css',
    disable: env.development || env.test,
    allChunks: true
  });
  const analyzer = new BundleAnalyzerPlugin({
    // filename relative to config output.path
    reportFilename: join('..', 'webpack_analyzer_report.html'),
    analyzerMode: 'static'
  });
  const environment = new webpack.EnvironmentPlugin([ 'NODE_ENV' ]);
  const noBuildWithErrors = new webpack.NoErrorsPlugin();
  const notifier = new WebpackNotifierPlugin();
  const clearBuildFolders = new CleanWebpackPlugin([ resolve('dist') ]);
  const namedModules = new webpack.NamedModulesPlugin();
  const progressBar = new ProgressBarPlugin();

  const plugins = [
    html,
    styles,
    commons,
    environment,
    progressBar,
    noBuildWithErrors,
    clearBuildFolders,
    namedModules
  ];

  if (env.development) {
    plugins.push(notifier);
  }

  if (env.analyze) {
    plugins.push(analyzer);
  }

  return plugins;
};
