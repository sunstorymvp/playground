module.exports = () => ({
  compress: true,
  historyApiFallback: true,
  port: 4000,
  stats: {
    chunks: false,
    children: false,
    hash: false,
    version: false,
    maxModules: 0
  }
});
