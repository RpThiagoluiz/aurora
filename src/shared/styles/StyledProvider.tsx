import React, { ReactNode } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native'

import { useTheme } from '../../hooks'

interface StyledProviderProps {
  children: ReactNode
}

export const StyledProvider = ({ children }: StyledProviderProps) => {
  const { colors } = useTheme()

  const styledTheme = {
    colors,
  }

  return (
    <StyledThemeProvider theme={styledTheme}>{children}</StyledThemeProvider>
  )
}
