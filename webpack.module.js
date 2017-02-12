const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { join, resolve } = path;

module.exports = (env) => ({
  rules: [
    {
      test: /\.js$/,
      include: resolve('src'),
      use: {
        loader: 'babel-loader',
        options: { cacheDirectory: env.development }
      }
    },
    {
      test: /\.css$/,
      include: resolve('src'),
      use: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: [
          {
            loader: 'css-loader',
            options: {
              minimize: env.production,
              sourceMap: env.development,
              localIdentName: env.production ? '[hash:6]' : '[path][name]__[local]',
              modules: true
            }
          },
          { loader: 'postcss-loader' }
        ]
      })
    },
    {
      test: /\.css$/,
      include: resolve('node_modules'),
      use: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: [
          {
            loader: 'css-loader',
            options: {
              minimize: env.production,
              sourceMap: env.development
            }
          }
        ]
      })
    },
    {
      test: /\.(png|jpe?g|webp)$/,
      use: {
        loader: 'url-loader',
        options: {
          // filename relative to config output.path
          name: join('assets', 'images', env.production ? '[name].[hash:6].[ext]' : '[name].[ext]'),
          limit: 20000
        }
      }
    },
    {
      test: /\.svg$/,
      use: {
        loader: 'svg-url-loader',
        options: {
          name: join('assets', 'images', env.production ? '[name].[hash:6].[ext]' : '[name].[ext]'),
          limit: 20000
        }
      }
    },
    {
      test: /\.(woff|woff2)$/,
      use: {
        loader: 'file-loader',
        options: {
          // filename relative to config output.path
          name: join('assets', 'fonts', env.production ? '[name].[hash:6].[ext]' : '[name].[ext]')
        }
      }
    },
    {
      test: /\.(graphql|gql)$/,
      use: { loader: 'graphql-tag/loader' }
    }
  ]
});
