const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const { join, resolve } = path;

module.exports = (env) => {
  const html = new HtmlWebpackPlugin({
    // filename relative to config output.path
    filename: 'index.html',
    template: join('src', 'index.html'),
    inject: true
  });
  const commonChunks = new webpack.optimize.CommonsChunkPlugin({
    // filename relative to config output.path
    filename: '[name].[hash:6].bundle.js',
    name: 'vendor',
    minChunks: 2
  });
  const extractStyles = new ExtractTextPlugin({
    // filename relative to config output.path
    filename: '[name].[contenthash:6].bundle.css',
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
  const clearBuildFolders = new CleanWebpackPlugin([ resolve('dist') ], {
    verbose: true
  });

  const plugins = [
    html,
    commonChunks,
    extractStyles,
    environment,
    noBuildWithErrors,
    notifier,
    clearBuildFolders
  ];

  if (env.analyze) {
    plugins.push(analyzer);
  }

  return plugins;
};
