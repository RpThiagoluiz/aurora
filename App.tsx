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

function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" backgroundColor="#121212" />
        <AppNavigator />
      </SafeAreaProvider>
    </ThemeProvider>
  )
}

export default App
