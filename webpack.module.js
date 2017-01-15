const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { join } = path;

module.exports = (env) => ({
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: { cacheDirectory: env.development }
      }
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: [
          {
            loader: 'css-loader',
            query: {
              minimize: env.production,
              sourceMap: env.development
            }
          },
          { loader: 'postcss-loader' }
        ]
      })
    },
    {
      test: /\.(png|jpe?g|svg|webp)$/,
      use: {
        loader: 'url-loader',
        options: {
          // filename relative to config output.path
          name: join('assets', 'images', '[name].[hash:6].[ext]'),
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
          name: join('assets', 'fonts', '[name].[hash:6].[ext]')
        }
      }
    }
  ]
});
