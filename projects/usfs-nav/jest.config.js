module.exports = {
  "errorOnDeprecated": true,
  "clearMocks": true,
  "transform": {
    ".(ts|tsx)": "ts-jest"
  },
  "testEnvironment": "node",
  "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx)$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js"
  ],
  "setupTestFrameworkScriptFile": "./test/framework-setup.ts",
  "coveragePathIgnorePatterns": [
    "/node_modules/",
    "/test/"
  ],
  "coverageThreshold": {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 90,
      "statements": 90
    }
  },
  "collectCoverage": true,
  "collectCoverageFrom": [
    "src/containers/*.tsx"
  ]
}
