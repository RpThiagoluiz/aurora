/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { AppNavigator } from './src/navigation'
import { ThemeProvider } from './src/shared'
import { useTheme } from './src/hooks'

function AppContent() {
  const { colors, themeType } = useTheme()

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.BACKGROUND_PRIMARY}
      />
      <AppNavigator />
    </SafeAreaProvider>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
