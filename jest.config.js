module.exports = {
  collectCoverageFrom: [
    'src/**/*.js'
  ],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    'node_modules',
    'config',
    'vendor'
  ],
  coverageReporters: [
    'html',
    'text'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  moduleDirectories: [
    'src',
    'node_modules'
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': '<rootDir>/jest.file-stub.js',
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  notify: true,
  testRegex: '\\.test\\.js$',
  transform: {
    '\\.(gql|graphql)$': 'jest-transform-graphql',
    '.*': 'babel-jest'
  },
  snapshotSerializers: [ 'enzyme-to-json/serializer' ]
};
