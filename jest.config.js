module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|styled-components)/)',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}
