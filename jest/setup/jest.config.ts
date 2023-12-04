
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['../'],
    testMatch: [
      '**/*.test.ts'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    testResultsProcessor: 'jest-stare',
};

export default config;