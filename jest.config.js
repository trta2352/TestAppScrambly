/* eslint-disable no-undef */
module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: ['!node_modules/', 'jest-runner'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['./jestTestSetup.js'],
  fakeTimers: {
    enableGlobally: true,
    legacyFakeTimers: true,
  },
  resetMocks: true,
  setupFilesAfterEnv: [],
  collectCoverageFrom: ['src/**/*.(js|ts|tsx)'],
  coverageReporters: ['text', 'html', 'lcov'],
  reporters: ['default'],
};
