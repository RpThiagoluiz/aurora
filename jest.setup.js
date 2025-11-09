/* eslint-disable no-undef */
// Jest setup file

// Mock react-native-vector-icons
jest.mock('react-native-vector-icons/Ionicons', () => 'Icon')

// Mock useColorScheme
jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  default: jest.fn(() => 'light'),
}))
