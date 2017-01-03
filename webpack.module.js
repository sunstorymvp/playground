const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => ({
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: { cacheDirectory: env.development }
        }
      ]
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        loader: [
          {
            loader: 'css-loader',
            query: { sourceMap: true }
          },
          { loader: 'postcss-loader' }
        ]
      })
    }
  ]
});
