import React from 'react'
import { TextProps } from 'react-native'
import styled from 'styled-components/native'
import { getTypographyColor } from '../utils'

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

const StyledText = styled.Text<{
  variant: TypographyVariant
  colorType: string
}>`
  ${props => {
    switch (props.variant) {
      case 'h1':
        return `
          font-size: 32px;
          font-weight: bold;
          line-height: 40px;
        `
      case 'h2':
        return `
          font-size: 28px;
          font-weight: bold;
          line-height: 36px;
        `
      case 'h3':
        return `
          font-size: 24px;
          font-weight: 600;
          line-height: 32px;
        `
      case 'subtitle1':
        return `
          font-size: 20px;
          font-weight: 500;
          line-height: 28px;
        `
      case 'subtitle2':
        return `
          font-size: 18px;
          font-weight: 500;
          line-height: 24px;
        `
      case 'body1':
        return `
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;
        `
      case 'body2':
        return `
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
        `
      case 'caption':
        return `
          font-size: 12px;
          font-weight: 400;
          line-height: 16px;
        `
      case 'overline':
        return `
          font-size: 10px;
          font-weight: 500;
          line-height: 14px;
          text-transform: uppercase;
        `
      case 'button':
        return `
          font-size: 14px;
          font-weight: 600;
          line-height: 20px;
        `
      default:
        return `
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;
        `
    }
  }}

  color: ${props => getTypographyColor(props.colorType, props.theme as any)};
`

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  color = 'primary',
  children,
  ...props
}) => {
  return (
    <StyledText variant={variant} colorType={color} {...props}>
      {children}
    </StyledText>
  )
}
