import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Ionicons'

export interface ButtonProps extends TouchableOpacityProps {
  title: string
  variant?: 'primary' | 'secondary'
  icon?: string
  iconName?: string // Para Ionicons
  loading?: boolean
  fullWidth?: boolean
}

const StyledButton = styled.TouchableOpacity<{
  variant: 'primary' | 'secondary'
  fullWidth: boolean
  isDisabled: boolean
  isLoading: boolean
}>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  border-radius: 12px;
  min-height: 56px;
  flex: ${props => (props.fullWidth ? 1 : 'none')};

  ${props => {
    const theme = props.theme as any

    if (props.isDisabled || props.isLoading) {
      return `
        background-color: ${theme.colors.TEXT_SECONDARY};
        border-width: ${props.variant === 'secondary' ? 1 : 0}px;
        border-color: ${theme.colors.TEXT_SECONDARY};
      `
    }

    if (props.variant === 'primary') {
      return `
        background-color: ${theme.colors.ACCENT_PRIMARY};
        border-width: 0px;
        border-color: ${theme.colors.ACCENT_PRIMARY};
      `
    } else {
      return `
        background-color: ${theme.colors.BACKGROUND_SECONDARY};
        border-width: 1px;
        border-color: ${theme.colors.TEXT_SECONDARY};
      `
    }
  }}
`

const ContentContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const IconContainer = styled.View<{ hasIcon: boolean }>`
  margin-right: ${props => (props.hasIcon ? 8 : 0)}px;
`

const IconText = styled.Text<{
  variant: 'primary' | 'secondary'
  isDisabled: boolean
  isLoading: boolean
}>`
  font-size: 18px;
  ${props => {
    const theme = props.theme as any

    if (props.isDisabled || props.isLoading) {
      return `color: ${theme.colors.BACKGROUND_SECONDARY};`
    }

    return props.variant === 'primary'
      ? 'color: #FFFFFF;'
      : `color: ${theme.colors.TEXT_PRIMARY};`
  }}
`

const ButtonText = styled.Text<{
  variant: 'primary' | 'secondary'
  isDisabled: boolean
  isLoading: boolean
}>`
  font-size: 16px;
  font-weight: 600;
  opacity: ${props => (props.isLoading ? 0.7 : 1)};

  ${props => {
    const theme = props.theme as any

    if (props.isDisabled || props.isLoading) {
      return `color: ${theme.colors.BACKGROUND_SECONDARY};`
    }

    return props.variant === 'primary'
      ? 'color: #FFFFFF;'
      : `color: ${theme.colors.TEXT_PRIMARY};`
  }}
`

export const Button = ({
  title,
  variant = 'primary',
  icon,
  iconName,
  loading = false,
  fullWidth = false,
  disabled,
  ...props
}: ButtonProps) => {
  const getTextColor = () => {
    if (disabled || loading) {
      return '#A0A0A0' // colors.BACKGROUND_SECONDARY equivalent
    }
    return variant === 'primary' ? '#FFFFFF' : undefined // Let styled handle it
  }

  const hasIcon = !!(icon || iconName)

  return (
    <StyledButton
      variant={variant}
      fullWidth={fullWidth}
      isDisabled={!!disabled}
      isLoading={loading}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      <ContentContainer>
        {hasIcon && !loading && (
          <IconContainer hasIcon={hasIcon}>
            {iconName ? (
              <Icon name={iconName} size={18} color={getTextColor()} />
            ) : (
              <IconText
                variant={variant}
                isDisabled={!!disabled}
                isLoading={loading}
              >
                {icon}
              </IconText>
            )}
          </IconContainer>
        )}
        <ButtonText
          variant={variant}
          isDisabled={!!disabled}
          isLoading={loading}
        >
          {loading ? 'Carregando...' : title}
        </ButtonText>
      </ContentContainer>
    </StyledButton>
  )
}
