/** @type {import("jest").Config} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom", // Изменено с "node" на "jsdom" для поддержки React компонентов
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@/components/(.*)$": "<rootDir>/src/Templates/$1",
    "^@/templates/(.*)$": "<rootDir>/src/Templates/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg|png)$": "jest-transform-stub",
  },
  transformIgnorePatterns: ["node_modules/(?!(camelcase-keys|map-obj)/)"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testMatch: [
    "**/__tests__/**/*.(ts|tsx|js)",
    "**/*.(test|spec).(ts|tsx|js)",
    "<rootDir>/__tests__/**/*.(ts|tsx|js)",
  ],
  roots: ["<rootDir>/src", "<rootDir>/__tests__"],
};
