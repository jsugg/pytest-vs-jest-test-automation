module.exports = {
    testRunner: 'jest-circus/runner',
    verbose: true,
    reporters: ['default', 'jest-stare'],
    testResultsProcessor: '<rootDir>/node_modules/jest-stare',
    //setupFilesAfterEnv: ['<rootDir>/setup/jest.setup.js'],
    testMatch: ['<rootDir>/tests/**/*[tT]est.js'],
    //moduleFileExtensions: [...defaults.moduleFileExtensions, 'js', 'node', 'ts', 'tsx'],
    //testEnvironment: 'jest-circus-allure-environment',
    //modulePaths: ['<rootDir>/tests/page_objects/**/*', '<rootDir>/tests/__tests__/*']
}
  