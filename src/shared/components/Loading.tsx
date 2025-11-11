import React from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'

type LoadingSize = 'small' | 'medium' | 'large'

interface LoadingProps {
  size?: LoadingSize
  color?: string
}

const getSizeValue = (size: LoadingSize): 'small' | 'large' => {
  switch (size) {
    case 'small':
      return 'small'
    case 'medium':
    case 'large':
      return 'large'
    default:
      return 'small'
  }
}

const Container = styled.View<{ size: LoadingSize }>`
  justify-content: center;
  align-items: center;
  padding: ${({ size }) => {
    switch (size) {
      case 'small':
        return '8px'
      case 'medium':
        return '16px'
      case 'large':
        return '24px'
      default:
        return '16px'
    }
  }};
`

const StyledActivityIndicator = styled(ActivityIndicator).attrs<{
  customSize: LoadingSize
  customColor?: string
}>(({ customSize, customColor, theme }) => ({
  size: getSizeValue(customSize),
  color: customColor || (theme as any)?.colors?.ACCENT_PRIMARY || '#007AFF',
}))<{ customSize: LoadingSize; customColor?: string }>``

export const Loading: React.FC<LoadingProps> = ({ size = 'medium', color }) => {
  return (
    <Container size={size}>
      <StyledActivityIndicator customSize={size} customColor={color} />
    </Container>
  )
}
