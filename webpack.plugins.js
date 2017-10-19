const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin');
const DotenvPlugin = require('webpack-dotenv-plugin');

module.exports = (env) => {
  const htmlWebpackPlugin = new HtmlWebpackPlugin({
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
  const extractTextPlugin = new ExtractTextPlugin({
    filename: env.production ? '[name].[contenthash:6].bundle.css' : '[name].bundle.css',
    disable: env.development || env.test,
    allChunks: true
  });
  const bundleAnalyzerPlugin = new BundleAnalyzerPlugin();
  const imageminPlugin = new ImageminPlugin({
    disable: env.development || env.test
  });
  const noEmitOnErrorsPlugin = new webpack.NoEmitOnErrorsPlugin();
  const webpackNotifierPlugin = new WebpackNotifierPlugin();
  const cleanWebpackPlugin = new CleanWebpackPlugin([ path.resolve('dist') ]);
  const namedModulesPlugin = new webpack.NamedModulesPlugin();
  const uglifyJsPlugin = new UglifyJsPlugin();
  const unusedFilesWebpackPlugin = new UnusedFilesWebpackPlugin({
    pattern: 'src/**/!(*.test|*.stories).@(js|css)',
    globOptions: { ignore: 'src/**/__mocks__/**' }
  });
  const dotenvPlugin = new DotenvPlugin({
    sample: path.resolve('.env.default'),
    path: path.resolve('.env')
  });

  // note - keep order for CommonsChunk definitions.
  const plugins = [
    htmlWebpackPlugin,
    extractTextPlugin,
    imageminPlugin,
    webpackCommonsChunk,
    npmCommonsChunk,
    asyncCommonsChunk,
    noEmitOnErrorsPlugin,
    namedModulesPlugin,
    unusedFilesWebpackPlugin,
    dotenvPlugin
  ];

  if (env.development) {
    plugins.push(webpackNotifierPlugin);
  }

  if (env.production) {
    plugins.push(cleanWebpackPlugin, uglifyJsPlugin);
  }

  if (env.analyze) {
    plugins.push(bundleAnalyzerPlugin);
  }

  return plugins;
};
