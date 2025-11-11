import React from 'react'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Typography } from './Typography'

interface StatusBadgeProps {
  completed: boolean
  size?: 'small' | 'medium'
  showLabel?: boolean
}

const BadgeContainer = styled.View<{
  backgroundColor: string
  size: 'small' | 'medium'
}>`
  background-color: ${props => props.backgroundColor};
  border-radius: ${props => (props.size === 'small' ? '8px' : '12px')};
  padding: ${props => (props.size === 'small' ? '4px 8px' : '6px 12px')};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${props => (props.size === 'small' ? '4px' : '6px')};
`

const BadgeText = styled(Typography)`
  color: #ffffff;
  font-weight: 600;
`

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  completed,
  size = 'small',
  showLabel = false,
}) => {
  const iconName = completed ? 'checkmark-circle' : 'time-outline'
  const iconSize = size === 'small' ? 12 : 16
  const label = completed ? 'Concluída' : 'Pendente'

  return (
    <BadgeContainer
      backgroundColor={completed ? '#6FCF97' : '#FF9500'}
      size={size}
    >
      <Icon name={iconName} size={iconSize} color="#FFFFFF" />
      {showLabel && (
        <BadgeText variant={size === 'small' ? 'caption' : 'body2'}>
          {label}
        </BadgeText>
      )}
    </BadgeContainer>
  )
}
