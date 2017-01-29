# playground
React and friends

## what's included
- [x] react and friends
- [x] webpack 2
- [x] code splitting with react-router (`import()`)
- [x] configured tree shaking (even for vendors)
- [x] configured HMR
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
- [x] media queries merging
- [x] minification: `babili`, `cssnano`, `html-minifier`, `imagemin`
- [x] js and css sourcemaps in development
- [x] linters:
  - [x] eslint with `node` and `react` plugins
  - [x] stylelint with `stylelint-config-standard`
  - [x] every rule configured
  - [x] removed duplicated rules inherited from `extends`
- [x] yarn lockfile
- [x] jest testing config (with coverage)
- [ ] critical css
- [x] graphql client ([Apollo](http://dev.apollodata.com/))
- [ ] server-side rendering
- [ ] ...

## install
```
yarn
```

## configure
To provide application secrets (github auth token, etc.) copy and fill [constants.secrets.js.example](src/config/constants.secrets.js.example) then save it without `.example`

## run
```
yarn run start:development
```

open [http://localhost:4000/](http://localhost:4000/).

## known issues
stylelint throws error because [mixins.css](src/config/mixins.css) contains custom-property-sets. See https://github.com/stylelint/stylelint/issues/626. Waiting for the fix. Workaround is to use stylelint via editor plugin.
