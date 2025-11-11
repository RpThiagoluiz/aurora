import React from 'react'
import styled from 'styled-components/native'
import { Typography, PriorityBadge, StatusBadge } from '../../../shared'
import { formatTaskDateCompact } from '../../../shared/utils'
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

const TaskInfo = styled.View`
  flex: 1;
  gap: 4px;
`

const BadgeColumn = styled.View`
  gap: 12px;
  align-items: flex-end;
`

export const TaskCard = React.memo<TaskCardProps>(({ todo, onPress }) => {
  const priorityText =
    todo.priority === 'high'
      ? 'Alta'
      : todo.priority === 'medium'
        ? 'Média'
        : 'Baixa'
  const statusText = todo.completed ? 'Concluída' : 'Pendente'

  return (
    <TaskItem
      onPress={() => onPress(todo.id)}
      testID="task-card"
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`Tarefa: ${todo.title}. Prioridade: ${priorityText}. Status: ${statusText}`}
    >
      <TaskHeader>
        <TaskInfo>
          <Typography
            variant="body1"
            color={todo.completed ? 'success' : 'primary'}
          >
            {todo.title}
          </Typography>
          <Typography variant="caption" color="secondary">
            Criada em: {formatTaskDateCompact(todo.id)}
          </Typography>
        </TaskInfo>
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
