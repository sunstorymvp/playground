const postcssImport = require('postcss-import');
const cssnext = require('postcss-cssnext');
const mqpacker = require('css-mqpacker');

module.exports = {
  plugins: [
    postcssImport(),
    cssnext({
      features: {
        overflowWrap: { method: 'copy' }
      }
    }),
    mqpacker()
  ]
};
