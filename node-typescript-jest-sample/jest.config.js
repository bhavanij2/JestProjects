module.exports = {
  automock: false,
  resetMocks: true,
  preset: "ts-jest",
  // collectCoverage: true,
  // collectCoverageFrom: ['src/**/*.{js,jsx,ts}', "!src/**/*.spec.{js,jsx,ts}"],
  //   testPathIgnorePatterns: ["/.history"],
  testRegex: ["(/__tests__/.*|(\\.|/)(test))(\\.ts)$"],
};
