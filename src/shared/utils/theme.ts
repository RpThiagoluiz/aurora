import { StyleSheet } from 'react-native'

import { Colors } from '../types'

export const createThemedStyles = <T extends Record<string, any>>(
  styleFactory: (colors: Colors) => T,
) => styleFactory

export const createStyles = <T extends Record<string, any>>(styles: T) =>
  StyleSheet.create(styles)
