import React from 'react'
import styled from 'styled-components/native'
import { Typography, PriorityBadge, StatusBadge } from '../../../shared'
import { Todo } from '../../../services/database/DatabaseService'

interface TaskCardProps {
  todo: Todo
  onPress: (todoId: string) => void
}

const TaskItem = styled.TouchableOpacity`
  background-color: ${props =>
    (props.theme as any).colors.BACKGROUND_SECONDARY};
  padding: 16px;
  border-radius: 12px;
  gap: 8px;
  margin: 2px 0px;
  margin-bottom: 12px;
`

const TaskHeader = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

const TaskTitle = styled.View`
  flex: 1;
`

const BadgeColumn = styled.View`
  gap: 12px;
  align-items: flex-end;
`

export const TaskCard = React.memo<TaskCardProps>(({ todo, onPress }) => {
  return (
    <TaskItem onPress={() => onPress(todo.id)}>
      <TaskHeader>
        <TaskTitle>
          <Typography
            variant="body1"
            color={todo.completed ? 'success' : 'primary'}
          >
            {todo.title}
          </Typography>
        </TaskTitle>
        <BadgeColumn>
          <PriorityBadge priority={todo.priority} />
          <StatusBadge completed={todo.completed} />
        </BadgeColumn>
      </TaskHeader>
      {todo.description && (
        <Typography variant="caption" color="secondary">
          {todo.description}
        </Typography>
      )}
    </TaskItem>
  )
})

TaskCard.displayName = 'TaskCard'
