module.exports = {
    testRunner: 'jest-circus/runner',
    verbose: true,
    reporters: ['default', 'jest-stare'],
    rootDir: '../',
    testMatch: ['**/*.test.js'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    testResultsProcessor: 'jest-stare',
}
