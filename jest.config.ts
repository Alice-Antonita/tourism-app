import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  moduleNameMapper: {
    // Handling static assets
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Handling image imports
    '\\.(jpg|jpeg|png|gif|webp|svg)$': './__mocks__/fileMock.js',

    // If you use path aliases in your project defined in tsconfig.json, you'll need to replicate them here
    '^@components/(.*)$': '@src/components/$1',
    '^@public/(.*)$': './public/$1'
  },
  transform: {
    // Use ts-jest for TypeScript files
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.jest.json' // Recommended to have a specific tsconfig for tests
    }
  }
};

export default config;
