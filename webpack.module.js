const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const getStyleLoaders = (env, { modules }) => ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: [
    {
      loader: 'cache-loader',
      options: {
        cacheDirectory: path.resolve('node_modules', '.cache', 'cache-loader')
      }
    },
    {
      loader: 'css-loader',
      options: {
        minimize: env.production,
        sourceMap: env.development,
        localIdentName: '_[hash:6]__[folder]_[local]',
        importLoaders: 1,
        modules
      }
    },
    { loader: 'postcss-loader' }
  ]
});

module.exports = (env) => ({
  rules: [
    {
      test: /\.js$/,
      include: path.resolve('src'),
      use: [
        {
          loader: 'cache-loader',
          options: {
            cacheDirectory: path.resolve('node_modules', '.cache', 'cache-loader')
          }
        },
        { loader: 'babel-loader' }
      ]
    },
    {
      test: /\.css$/,
      include: path.resolve('src'),
      use: getStyleLoaders(env, { modules: true })
    },
    {
      test: /\.css$/,
      include: path.resolve('node_modules'),
      use: getStyleLoaders(env, { modules: false })
    },
    {
      test: /\.(png|jpe?g|webp)$/,
      loader: 'url-loader',
      options: {
        name: path.join('assets', 'images', env.production ? '[name].[hash:6].[ext]' : '[name].[ext]'),
        limit: 20000
      }
    },
    {
      test: /\.svg$/,
      loader: 'svg-url-loader',
      options: {
        name: path.join('assets', 'images', env.production ? '[name].[hash:6].[ext]' : '[name].[ext]'),
        limit: 20000
      }
    },
    {
      test: /\.(woff|woff2)$/,
      loader: 'file-loader',
      options: {
        name: path.join('assets', 'fonts', env.production ? '[name].[hash:6].[ext]' : '[name].[ext]')
      }
    }
  ]
});
