import React, { useEffect } from 'react'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp } from '@react-navigation/native'
import {
  Typography,
  Loading,
  useTodos,
  PriorityBadge,
  StatusBadge,
} from '../../../shared'
import { RootStackParamList } from '../../../navigation/StackNavigator'

const Container = styled.View`
  flex: 1;
  background-color: ${props => (props.theme as any).colors.BACKGROUND_PRIMARY};
`

const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  padding: 20px;
`

const Header = styled.View`
  margin-bottom: 24px;
  gap: 8px;
`

const Section = styled.View`
  margin-bottom: 24px;
  gap: 12px;
`

const TaskCard = styled.View`
  background-color: ${props =>
    (props.theme as any).colors.BACKGROUND_SECONDARY};
  padding: 16px;
  border-radius: 12px;
  align-items: center;
  gap: 4px;
`

const StatsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const StatCard = styled.View`
  flex: 1;
  background-color: ${props =>
    (props.theme as any).colors.BACKGROUND_SECONDARY};
  padding: 16px;
  border-radius: 12px;
  margin: 0 4px;
  align-items: center;
`

const StatNumber = styled.View`
  margin-bottom: 4px;
`

const StatLabel = styled.View`
  text-align: center;
`

const TaskList = styled.View`
  gap: 12px;
  padding-bottom: 40px;
`

const TaskItem = styled.TouchableOpacity`
  background-color: ${props =>
    (props.theme as any).colors.BACKGROUND_SECONDARY};
  padding: 16px;
  border-radius: 12px;
  gap: 8px;
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

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const { todos, isLoading, get } = useTodos()

  const completedTodos = todos.filter(todo => todo.completed)
  const pendingTodos = todos.filter(todo => !todo.completed)

  useEffect(() => {
    get()
  }, [get])

  const handleTodoPress = (todoId: string) => {
    navigation.navigate('TodoDetail', { todoId })
  }

  console.log('Rendering HomeScreen with todos:', todos)

  if (isLoading) {
    return (
      <Container>
        <Content>
          <Header>
            <Typography variant="h2">Olá! 👋</Typography>
            <Typography variant="body1" color="secondary">
              Bem-vindo ao Aurora, seu gerenciador de tarefas inteligente.
            </Typography>
          </Header>
          <Loading size="large" />
        </Content>
      </Container>
    )
  }

  return (
    <Container>
      <Content>
        <Header>
          <Typography variant="h2">Olá! 👋</Typography>
          <Typography variant="body1" color="secondary">
            Bem-vindo ao Aurora, seu gerenciador de tarefas inteligente.
          </Typography>
        </Header>

        <Section>
          <Typography variant="subtitle1">Resumo das Tarefas</Typography>
          <StatsContainer>
            <StatCard>
              <StatNumber>
                <Typography variant="h1">{todos.length}</Typography>
              </StatNumber>
              <StatLabel>
                <Typography variant="caption" color="secondary">
                  Total
                </Typography>
              </StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>
                <Typography variant="h1" color="success">
                  {completedTodos.length}
                </Typography>
              </StatNumber>
              <StatLabel>
                <Typography variant="caption" color="secondary">
                  Concluídas
                </Typography>
              </StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>
                <Typography variant="h1" color="warning">
                  {pendingTodos.length}
                </Typography>
              </StatNumber>
              <StatLabel>
                <Typography variant="caption" color="secondary">
                  Pendentes
                </Typography>
              </StatLabel>
            </StatCard>
          </StatsContainer>
        </Section>

        <Section>
          <Typography variant="subtitle1">Tarefas Recentes</Typography>
          {todos.length === 0 ? (
            <TaskCard>
              <Typography variant="body1">Nenhuma tarefa encontrada</Typography>
              <Typography variant="caption" color="secondary">
                Adicione sua primeira tarefa usando o botão + abaixo
              </Typography>
            </TaskCard>
          ) : (
            <TaskList>
              {todos.slice(0, 5).map(todo => (
                <TaskItem
                  key={todo.id}
                  onPress={() => handleTodoPress(todo.id)}
                >
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
              ))}
            </TaskList>
          )}
        </Section>
      </Content>
    </Container>
  )
}
