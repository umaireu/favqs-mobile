/* eslint-disable */

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock Vector Icons
jest.mock('@react-native-vector-icons/fontawesome6', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    __esModule: true,
    default: ({ name, size, color, style }) => 
      React.createElement(Text, { 
        testID: `icon-${name}`,
        style: [{ fontSize: size, color }, style] 
      }, name),
  };
});
