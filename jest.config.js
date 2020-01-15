module.exports = {
  collectCoverageFrom: ['src/**/*.js'],
  coverageDirectory: './coverage/',
  setupFilesAfterEnv: ['<rootDir>/.jest.init.js'],
  testMatch: ['**/__tests__/**/*.js?(x)', '**/+(*.)+(spec|test).js?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  testURL: 'http://localhost'
}
