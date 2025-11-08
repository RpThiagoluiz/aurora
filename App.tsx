/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { useTheme } from './src/hooks'
import { ExampleComponent, ThemeProvider } from './src/shared'

function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" />
        <AppContent />
      </SafeAreaProvider>
    </ThemeProvider>
  )
}

function AppContent() {
  const { colors } = useTheme()

  return (
    <View
      style={[styles.container, { backgroundColor: colors.BACKGROUND_PRIMARY }]}
    >
      <ExampleComponent />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default App
