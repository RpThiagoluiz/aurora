import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'

import { useTheme } from '../../hooks'

export interface ButtonProps extends TouchableOpacityProps {
  title: string
  variant?: 'primary' | 'secondary'
  icon?: string
  loading?: boolean
  fullWidth?: boolean
}

export const Button = ({
  title,
  variant = 'primary',
  icon,
  loading = false,
  fullWidth = false,
  disabled,
  style,
  ...props
}: ButtonProps) => {
  const { colors } = useTheme()

  const getButtonStyles = () => {
    const baseStyles = {
      backgroundColor:
        variant === 'primary'
          ? colors.ACCENT_PRIMARY
          : colors.BACKGROUND_SECONDARY,
      borderColor:
        variant === 'primary' ? colors.ACCENT_PRIMARY : colors.TEXT_SECONDARY,
    }

    if (disabled || loading) {
      return {
        ...baseStyles,
        backgroundColor: colors.TEXT_SECONDARY,
        borderColor: colors.TEXT_SECONDARY,
      }
    }

    return baseStyles
  }

  const getTextColor = () => {
    if (disabled || loading) {
      return colors.BACKGROUND_SECONDARY
    }
    return variant === 'primary' ? '#FFFFFF' : colors.TEXT_PRIMARY
  }

  const buttonStyles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 12,
      borderWidth: variant === 'secondary' ? 1 : 0,
      minHeight: 56,
      flex: fullWidth ? 1 : undefined,
      ...getButtonStyles(),
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      marginRight: icon ? 8 : 0,
    },
    iconText: {
      fontSize: 18,
      color: getTextColor(),
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: getTextColor(),
    },
    loadingText: {
      opacity: 0.7,
    },
  })

  return (
    <TouchableOpacity
      style={[buttonStyles.button, style]}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      <View style={buttonStyles.content}>
        {icon && !loading && (
          <Text style={[buttonStyles.iconText, buttonStyles.icon]}>{icon}</Text>
        )}
        <Text style={[buttonStyles.title, loading && buttonStyles.loadingText]}>
          {loading ? 'Carregando...' : title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
