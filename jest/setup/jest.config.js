module.exports = {
    testRunner: 'jest-circus/runner',
    verbose: true,
    reporters: ['default', 'jest-stare'],
    testResultsProcessor: '<rootDir>/node_modules/jest-stare',
}
  