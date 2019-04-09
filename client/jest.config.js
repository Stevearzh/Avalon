module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json',
    },
  },
  "moduleDirectories": [
    "node_modules"
  ],
  moduleFileExtensions: ['web.ts', 'ts', 'web.tsx', 'tsx', 'web.js', 'js', 'web.jsx', 'jsx', 'mjs', 'json', 'node'],
  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/src/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@models/(.*)$": "<rootDir>/src/models/$1",
    "^@styles/(.*)$": "<rootDir>/src/styles/$1",
    "^@views/(.*)$": "<rootDir>/src/views/1",
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: ["<rootDir>/config/setupEnzyme.ts"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  testEnvironment: 'node',
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  testURL: 'http://localhost',
  transform: {
    '^(?!.*\\.(css|js|json|jsx|mjs|ts|tsx)$)': '<rootDir>/config/jest/fileTransform.js',
    '^.+\\.(css|less)$': '<rootDir>/config/jest/cssTransform.js',
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|ts|tsx)$'],
}
