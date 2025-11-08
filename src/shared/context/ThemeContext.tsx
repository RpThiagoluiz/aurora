import React, { createContext, ReactNode } from 'react'

import { THEMES } from '../constants'
import { Theme, ThemeType } from '../types'

interface ThemeContextType {
  theme: Theme
  themeType: ThemeType
  colors: Theme['colors']
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
)

interface ThemeProviderProps {
  children: ReactNode
  themeType?: ThemeType
}

export const ThemeProvider = ({
  children,
  themeType = 'dark',
}: ThemeProviderProps) => {
  const theme = THEMES[themeType]

  const value: ThemeContextType = {
    theme,
    themeType,
    colors: theme.colors,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
