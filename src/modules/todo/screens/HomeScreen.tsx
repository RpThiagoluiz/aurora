import React, { useEffect, useCallback, useState, useMemo } from 'react'
import styled from 'styled-components/native'
import { FlatList, ListRenderItem } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp } from '@react-navigation/native'
import { Typography, Loading, useTodos } from '../../../shared'
import { useTheme } from '../../../hooks'
import { TodoFilter } from '../../../shared/types'
import { getFilterColors } from '../../../shared/utils'
import { TaskCard as TaskCardComponent } from '../components'
import { Todo } from '../../../services/database/DatabaseService'
import { RootStackParamList } from '../../../navigation/StackNavigator'

const Container = styled.View`
  flex: 1;
  background-color: ${props => (props.theme as any).colors.BACKGROUND_PRIMARY};
`

const Content = styled.View`
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

const StatsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const StatCard = styled.TouchableOpacity<{
  isActive?: boolean
  activeColor?: string
}>`
  flex: 1;
  background-color: ${props =>
    (props.theme as any).colors.BACKGROUND_SECONDARY};
  padding: 16px;
  border-radius: 12px;
  margin: 0 4px;
  align-items: center;
  border-bottom-width: ${props => (props.isActive ? '3px' : '0px')};
  border-bottom-color: ${props =>
    props.isActive ? props.activeColor : 'transparent'};
`

const StatNumber = styled.View`
  margin-bottom: 4px;
`

const StatLabel = styled.View`
  text-align: center;
`

const EmptyTaskCard = styled.View`
  background-color: ${props =>
    (props.theme as any).colors.BACKGROUND_SECONDARY};
  padding: 16px;
  border-radius: 12px;
  align-items: center;
  gap: 4px;
`

const flatListContentContainerStyle = { flexGrow: 1 }

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const { todos, isLoading, get } = useTodos()
  const theme = useTheme()

  const completedTodos = todos.filter(todo => todo.completed)
  const pendingTodos = todos.filter(todo => !todo.completed)

  const [activeFilter, setActiveFilter] = useState<TodoFilter>('all')

  const filteredTodos = useMemo(() => {
    switch (activeFilter) {
      case 'completed':
        return completedTodos
      case 'pending':
        return pendingTodos
      default:
        return todos
    }
  }, [todos, completedTodos, pendingTodos, activeFilter])

  const handleFilterPress = useCallback((filter: TodoFilter) => {
    setActiveFilter(filter)
  }, [])

  useEffect(() => {
    get()
  }, [get])

  const handleTodoPress = useCallback(
    (todoId: string) => {
      navigation.navigate('TodoDetail', { todoId })
    },
    [navigation],
  )

  const renderTaskItem: ListRenderItem<Todo> = useCallback(
    ({ item }) => <TaskCardComponent todo={item} onPress={handleTodoPress} />,
    [handleTodoPress],
  )

  const keyExtractor = useCallback((item: Todo) => item.id, [])

  const getItemLayout = useCallback(
    (_: ArrayLike<Todo> | null | undefined, index: number) => ({
      length: 88,
      offset: 88 * index,
      index,
    }),
    [],
  )

  const ListHeader = useCallback(
    () => (
      <>
        <Header>
          <Typography variant="h2">Olá! 👋</Typography>
          <Typography variant="body1" color="secondary">
            Bem-vindo ao Aurora, seu gerenciador de tarefas inteligente.
          </Typography>
        </Header>

        <Section>
          <Typography variant="subtitle1">Resumo das Tarefas</Typography>
          <StatsContainer>
            <StatCard
              isActive={activeFilter === 'all'}
              activeColor={getFilterColors('all', theme).activeColor}
              onPress={() => handleFilterPress('all')}
            >
              <StatNumber>
                <Typography variant="h1" color="accent">
                  {todos.length}
                </Typography>
              </StatNumber>
              <StatLabel>
                <Typography variant="caption" color="secondary">
                  Total de {'\n'} tarefas
                </Typography>
              </StatLabel>
            </StatCard>
            <StatCard
              isActive={activeFilter === 'completed'}
              activeColor={getFilterColors('completed', theme).activeColor}
              onPress={() => handleFilterPress('completed')}
            >
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
            <StatCard
              isActive={activeFilter === 'pending'}
              activeColor={getFilterColors('pending', theme).activeColor}
              onPress={() => handleFilterPress('pending')}
            >
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
        </Section>
      </>
    ),
    [
      todos.length,
      completedTodos.length,
      pendingTodos.length,
      activeFilter,
      handleFilterPress,
      theme,
    ],
  )

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
        <FlatList
          data={filteredTodos.slice(0, 5)}
          keyExtractor={keyExtractor}
          renderItem={renderTaskItem}
          getItemLayout={getItemLayout}
          ListHeaderComponent={ListHeader}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={flatListContentContainerStyle}
          ListEmptyComponent={
            <EmptyTaskCard>
              <Typography variant="body1">Nenhuma tarefa encontrada</Typography>
              <Typography variant="caption" color="secondary">
                Adicione sua primeira tarefa usando o botão + abaixo
              </Typography>
            </EmptyTaskCard>
          }
        />
      </Content>
    </Container>
  )
}
