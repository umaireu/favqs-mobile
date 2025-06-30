module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest/setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-vector-icons|@react-native-vector-icons|react-native-error-boundary)/)'
  ],
  moduleNameMapper: {
    '^@env$': '<rootDir>/jest/env-mock.js',
  },
};
