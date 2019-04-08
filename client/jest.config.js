const tsconfig = require('./tsconfig.json')

module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json',
    },
  },
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  moduleNameMapper: Object.entries(tsconfig.compilerOptions.paths)
    .map(([key, [val]]) => [
      key.replace(/\*/, '(.*)'),
      `<rootDir>/${tsconfig.compilerOptions.baseUrl}/${val.replace(/\*/, '$1')}`,
    ])
    .reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {}),
  // preset: 'ts-jest',
  roots: [
    "<rootDir>/src"
  ],
  setupTestFrameworkScriptFile: "<rootDir>/config/setupEnzyme.ts",
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
