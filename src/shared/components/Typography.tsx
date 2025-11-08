import React from 'react'
import { StyleSheet, Text, TextProps, TextStyle } from 'react-native'

import { useTheme } from '../../hooks'

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline'
  | 'button'

export interface TypographyProps extends TextProps {
  variant?: TypographyVariant
  color?: 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'accent'
  children: React.ReactNode
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  color = 'primary',
  style,
  children,
  ...props
}) => {
  const { colors } = useTheme()

  const getVariantStyle = (variantType: TypographyVariant): TextStyle => {
    switch (variantType) {
      case 'h1':
        return {
          fontSize: 32,
          fontWeight: 'bold',
          lineHeight: 40,
        }
      case 'h2':
        return {
          fontSize: 28,
          fontWeight: 'bold',
          lineHeight: 36,
        }
      case 'h3':
        return {
          fontSize: 24,
          fontWeight: '600',
          lineHeight: 32,
        }
      case 'subtitle1':
        return {
          fontSize: 18,
          fontWeight: '600',
          lineHeight: 24,
        }
      case 'subtitle2':
        return {
          fontSize: 16,
          fontWeight: '600',
          lineHeight: 22,
        }
      case 'body1':
        return {
          fontSize: 16,
          fontWeight: '400',
          lineHeight: 22,
        }
      case 'body2':
        return {
          fontSize: 14,
          fontWeight: '400',
          lineHeight: 20,
        }
      case 'caption':
        return {
          fontSize: 12,
          fontWeight: '400',
          lineHeight: 16,
        }
      case 'overline':
        return {
          fontSize: 10,
          fontWeight: '500',
          lineHeight: 14,
          textTransform: 'uppercase',
        }
      case 'button':
        return {
          fontSize: 14,
          fontWeight: '600',
          lineHeight: 20,
        }
      default:
        return {}
    }
  }

  const getColorStyle = (colorType: string): TextStyle => {
    switch (colorType) {
      case 'primary':
        return { color: colors.TEXT_PRIMARY }
      case 'secondary':
        return { color: colors.TEXT_SECONDARY }
      case 'error':
        return { color: colors.STATUS_DELETE }
      case 'success':
        return { color: colors.STATUS_COMPLETE }
      case 'warning':
        return { color: colors.WARNING }
      case 'accent':
        return { color: colors.ACCENT_PRIMARY }
      default:
        return { color: colors.TEXT_PRIMARY }
    }
  }

  const styles = StyleSheet.create({
    text: {
      ...getVariantStyle(variant),
      ...getColorStyle(color),
    },
  })

  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  )
}
