import { NavigationContainer } from '@react-navigation/native'
import React from 'react'

import { useTheme } from '../hooks'
import { StackNavigator } from './StackNavigator'

export const AppNavigator = () => {
  const { colors } = useTheme()

  const navigationTheme = {
    dark: true,
    colors: {
      primary: colors.ACCENT_PRIMARY,
      background: colors.BACKGROUND_PRIMARY,
      card: colors.BACKGROUND_SECONDARY,
      text: colors.TEXT_PRIMARY,
      border: colors.BACKGROUND_SECONDARY,
      notification: colors.STATUS_DELETE,
    },
    fonts: {
      regular: {
        fontFamily: 'System',
        fontWeight: '400' as const,
      },
      medium: {
        fontFamily: 'System',
        fontWeight: '500' as const,
      },
      bold: {
        fontFamily: 'System',
        fontWeight: '600' as const,
      },
      heavy: {
        fontFamily: 'System',
        fontWeight: '700' as const,
      },
    },
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      <StackNavigator />
    </NavigationContainer>
  )
}
