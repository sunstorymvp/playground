const postcssImport = require('postcss-import');
const cssnext = require('postcss-cssnext');

module.exports = {
  plugins: [
    postcssImport({ path: 'src' }),
    cssnext({
      features: {
        overflowWrap: { method: 'copy' }
      }
    })
  ]
};
