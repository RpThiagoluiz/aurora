import React from 'react'
import styled from 'styled-components/native'
import { Typography } from './Typography'
import { getPriorityColor, getPriorityLabel } from '../utils'

type PriorityLevel = 'low' | 'medium' | 'high'

interface PriorityBadgeProps {
  priority: PriorityLevel
  size?: 'small' | 'medium'
}

const BadgeContainer = styled.View<{
  backgroundColor: string
  size: 'small' | 'medium'
}>`
  background-color: ${props => props.backgroundColor};
  border-radius: ${props => (props.size === 'small' ? '8px' : '12px')};
  padding: ${props => (props.size === 'small' ? '4px 8px' : '6px 12px')};
  align-items: center;
  justify-content: center;
`

const BadgeText = styled(Typography)`
  color: #ffffff;
  font-weight: 600;
`

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({
  priority,
  size = 'small',
}) => {
  return (
    <BadgeContainer backgroundColor={getPriorityColor(priority)} size={size}>
      <BadgeText variant={size === 'small' ? 'caption' : 'body2'}>
        {getPriorityLabel(priority)}
      </BadgeText>
    </BadgeContainer>
  )
}
