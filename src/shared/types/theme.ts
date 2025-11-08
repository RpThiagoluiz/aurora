export interface Colors {
  BACKGROUND_PRIMARY: string
  BACKGROUND_SECONDARY: string
  TEXT_PRIMARY: string
  TEXT_SECONDARY: string
  ACCENT_PRIMARY: string
  WARNING: string
  STATUS_COMPLETE: string
  STATUS_DELETE: string
}

export interface Theme {
  colors: Colors
}

export type ThemeType = 'dark'
