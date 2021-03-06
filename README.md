[![Build Status](https://travis-ci.org/sunstorymvp/playground.svg?branch=master)](https://travis-ci.org/sunstorymvp/playground)
[![Greenkeeper badge](https://badges.greenkeeper.io/sunstorymvp/playground.svg)](https://greenkeeper.io/)

# playground
React and friends

## what's included
- [x] react and friends
- [x] webpack 3
- [x] code splitting with react-router (`import()`)
- [x] configured tree shaking (even for vendors)
- [x] smart transpiling with `babel-preset-env` (see [.babelrc](.babelrc))
- [x] smart polyfills with `babel-preset-env` (see [src/config/polyfill.js](src/config/polyfill.js))
- [x] smart browser caching with `CommonsChunkPlugin`:
  - [x] separate webpack boilerplate
  - [x] separate polyfills
  - [x] separate vendors entry
  - [x] separate app entry
  - [x] separate commons for async chunks
- [x] configured [css-modules](https://github.com/css-modules/css-modules)
- [x] cssnext with smart fallbacks (see [browserslist](browserslist))
- [x] small images inlining
- [x] minification: `uglifyjs`, `cssnano`, `html-minifier`, `imagemin`
- [x] js and css sourcemaps in development
- [x] linters:
  - [x] eslint with `node` and `react` plugins
  - [x] stylelint with `stylelint-config-standard`
  - [x] every rule configured
  - [x] removed duplicated rules inherited from `extends`
- [x] yarn lockfile
- [x] jest testing config (with coverage)
- [x] Travis CI
- [x] configured [copy-paste](https://github.com/kucherenko/jscpd) detector

## install
```
yarn
```

## run
```
yarn run start
```

open [http://localhost:4000/](http://localhost:4000/).
