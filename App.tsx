/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { AppNavigator } from './src/navigation'
import { ThemeProvider, StyledProvider, TodoProvider } from './src/shared'
import { useTheme } from './src/hooks'

function AppContent() {
  const { colors, themeType } = useTheme()

  return (
    <StyledProvider>
      <SafeAreaProvider>
        <StatusBar
          barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor={colors.BACKGROUND_PRIMARY}
        />
        <AppNavigator />
      </SafeAreaProvider>
    </StyledProvider>
  )
}

function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <AppContent />
      </TodoProvider>
    </ThemeProvider>
  )
}

export default App
