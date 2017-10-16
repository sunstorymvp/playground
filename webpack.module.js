const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => ({
  rules: [
    {
      test: /\.js$/,
      include: path.resolve('src'),
      loader: 'babel-loader',
      options: { cacheDirectory: env.development }
    },
    {
      test: /\.css$/,
      include: path.resolve('src'),
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
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
      include: path.resolve('node_modules'),
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: {
          loader: 'css-loader',
          options: {
            minimize: env.production,
            sourceMap: env.development
          }
        }
      })
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
    },
    {
      test: /\.(graphql|gql)$/,
      loader: 'graphql-tag/loader'
    }
  ]
});
