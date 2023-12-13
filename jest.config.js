// jest.config.js
// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
  transform: {
  },
  // Removes the folders that are setup folders from the coverage report
  coveragePathIgnorePatterns: ['fixtures', 'form-options', 'pricing-tables', 'revenue-allocation'],
  moduleDirectories: ['node_modules', 'src'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    }
  },
};

export default config;
