import React, { createContext, ReactNode, useState } from 'react'
import { useColorScheme } from 'react-native'

import { THEMES } from '../constants'
import { Theme, ThemeType } from '../types'

interface ThemeContextType {
  theme: Theme
  themeType: ThemeType
  userThemeChoice: ThemeType
  colors: Theme['colors']
  setThemeType: (themeType: ThemeType) => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
)

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const systemColorScheme = useColorScheme()
  const [userThemeChoice, setUserThemeChoice] = useState<ThemeType>('auto')

  const getCurrentTheme = (): 'light' | 'dark' => {
    if (userThemeChoice === 'auto') {
      return systemColorScheme === 'dark' ? 'dark' : 'light'
    }
    return userThemeChoice as 'light' | 'dark'
  }

  const currentThemeKey = getCurrentTheme()
  const theme = THEMES[currentThemeKey]

  const setThemeType = (themeType: ThemeType) => {
    setUserThemeChoice(themeType)
  }

  const value: ThemeContextType = {
    theme,
    themeType: currentThemeKey,
    userThemeChoice,
    colors: theme.colors,
    setThemeType,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
