import { TodoFilter } from '../types'
import { Theme } from '../types'

export interface FilterColorConfig {
  textColor: string
  activeColor: string
}

export const getFilterColors = (
  filter: TodoFilter,
  theme: Theme,
): FilterColorConfig => {
  switch (filter) {
    case 'all':
      return {
        textColor: theme.colors.ACCENT_PRIMARY,
        activeColor: theme.colors.ACCENT_PRIMARY,
      }
    case 'completed':
      return {
        textColor: theme.colors.STATUS_COMPLETE,
        activeColor: theme.colors.STATUS_COMPLETE,
      }
    case 'pending':
      return {
        textColor: theme.colors.WARNING,
        activeColor: theme.colors.WARNING,
      }
    default:
      return {
        textColor: theme.colors.TEXT_PRIMARY,
        activeColor: theme.colors.ACCENT_PRIMARY,
      }
  }
}

export const getTypographyColor = (colorType: string, theme: Theme): string => {
  switch (colorType) {
    case 'primary':
      return theme.colors.TEXT_PRIMARY
    case 'secondary':
      return theme.colors.TEXT_SECONDARY
    case 'error':
      return theme.colors.STATUS_DELETE
    case 'success':
      return theme.colors.STATUS_COMPLETE
    case 'warning':
      return theme.colors.WARNING
    case 'accent':
      return theme.colors.ACCENT_PRIMARY
    default:
      return theme.colors.TEXT_PRIMARY
  }
}
