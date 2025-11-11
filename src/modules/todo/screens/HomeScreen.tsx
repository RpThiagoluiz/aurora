import React, { useEffect, useCallback, useRef } from 'react'
import styled from 'styled-components/native'
import { FlatList, ListRenderItem, Animated } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp } from '@react-navigation/native'
import { Typography, Loading, useTodos } from '../../../shared'
import { useTheme } from '../../../hooks'
import { getFilterColors } from '../../../shared/utils'
import { TaskCard } from '../components'
import { PriorityBadge } from '../../../shared/components'
import { useFilter } from '../../../shared/context'
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

const StatCardBase = styled.TouchableOpacity`
  flex: 1;
  background-color: ${props =>
    (props.theme as any).colors.BACKGROUND_SECONDARY};
  padding: 16px;
  border-radius: 12px;
  margin: 0 4px;
  align-items: center;
  position: relative;
  overflow: hidden;
`

const AnimatedBorder = styled(Animated.View)<{
  activeColor?: string
}>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.activeColor || 'transparent'};
  border-radius: 0 0 12px 12px;
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

// Componente StatCard funcional com animação
interface StatCardProps {
  isActive?: boolean
  activeColor?: string
  onPress: () => void
  children: React.ReactNode
}

const StatCard: React.FC<StatCardProps> = ({
  isActive = false,
  activeColor = '#000',
  onPress,
  children,
}) => {
  const borderHeight = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.spring(borderHeight, {
      toValue: isActive ? 3 : 0,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start()
  }, [isActive, borderHeight])

  return (
    <StatCardBase onPress={onPress}>
      {children}
      <AnimatedBorder
        activeColor={activeColor}
        style={{
          height: borderHeight,
        }}
      />
    </StatCardBase>
  )
}

// Componente AnimatedTaskItem com fade-in
interface AnimatedTaskItemProps {
  todo: Todo
  onPress: (todoId: string) => void
  index: number
  animationKey: number
}

const AnimatedTaskItem: React.FC<AnimatedTaskItemProps> = ({
  todo,
  onPress,
  index,
  animationKey,
}) => {
  const opacity = useRef(new Animated.Value(0)).current
  const translateY = useRef(new Animated.Value(20)).current

  useEffect(() => {
    // Reset animation values
    opacity.setValue(0)
    translateY.setValue(20)

    const delay = index * 50 // Staggered animation mais rápida

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        delay,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
    ]).start()
  }, [opacity, translateY, index, animationKey])

  return (
    <Animated.View
      style={{
        opacity,
        transform: [{ translateY }],
      }}
    >
      <TaskCard todo={todo} onPress={onPress} />
    </Animated.View>
  )
}

const FilterSection = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`

const FilterContent = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

const FilterActions = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`

const FilterButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${props =>
    (props.theme as any).colors.BACKGROUND_SECONDARY};
  align-items: center;
  justify-content: center;
`

const ClearFilterButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${props => (props.theme as any).colors.STATUS_DELETE};
  align-items: center;
  justify-content: center;
`

const SearchFilterChip = styled.View`
  background-color: ${props =>
    (props.theme as any).colors.BACKGROUND_SECONDARY};
  border-radius: 16px;
  padding: 6px 12px;
  margin-right: 8px;
`

const AnimatedGreeting = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

const WaveEmoji = styled(Animated.Text)`
  font-size: 28px;
`

const flatListContentContainerStyle = { flexGrow: 1 }

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const { isLoading, get } = useTodos()
  const theme = useTheme()
  const {
    activeFilter,
    advancedFilters,
    filteredTodos,
    totalTodos,
    completedTodos,
    pendingTodos,
    setActiveFilter,
    clearAllFilters,
    hasActiveFilters,
  } = useFilter()

  const waveAnimation = useRef(new Animated.Value(0)).current
  const animationKey = useRef(0)

  // Reset animation quando filteredTodos mudar
  useEffect(() => {
    animationKey.current += 1
  }, [filteredTodos])

  const handleFilterPress = useCallback(
    (filter: 'all' | 'completed' | 'pending') => {
      setActiveFilter(filter)
    },
    [setActiveFilter],
  )

  const handleOpenFilterDrawer = useCallback(() => {
    navigation.navigate('Filter')
  }, [navigation])

  useEffect(() => {
    get()
  }, [get])

  useEffect(() => {
    const startWaveAnimation = () => {
      Animated.sequence([
        Animated.timing(waveAnimation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnimation, {
          toValue: -0.8,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnimation, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnimation, {
          toValue: -0.5,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnimation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start()
    }

    const timer = setTimeout(startWaveAnimation, 500)
    return () => clearTimeout(timer)
  }, [waveAnimation])

  const handleTodoPress = useCallback(
    (todoId: string) => {
      navigation.navigate('TodoDetail', { todoId })
    },
    [navigation],
  )

  const renderTaskItem: ListRenderItem<Todo> = useCallback(
    ({ item, index }) => (
      <AnimatedTaskItem
        todo={item}
        onPress={handleTodoPress}
        index={index || 0}
        animationKey={animationKey.current}
      />
    ),
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
          <AnimatedGreeting>
            <Typography variant="h2">Olá! </Typography>
            <WaveEmoji
              style={{
                transform: [
                  {
                    rotate: waveAnimation.interpolate({
                      inputRange: [-1, -0.5, 0, 0.5, 1],
                      outputRange: [
                        '-20deg',
                        '-10deg',
                        '0deg',
                        '10deg',
                        '20deg',
                      ],
                    }),
                  },
                ],
              }}
            >
              👋
            </WaveEmoji>
          </AnimatedGreeting>
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
                  {totalTodos}
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
                  {completedTodos}
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
                  {pendingTodos}
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

        <FilterSection>
          <FilterContent>
            {advancedFilters.titleSearch.trim() && (
              <SearchFilterChip>
                <Typography variant="caption" color="secondary">
                  Busca: "{advancedFilters.titleSearch}"
                </Typography>
              </SearchFilterChip>
            )}
            {advancedFilters.priorities.map(priority => (
              <PriorityBadge key={priority} priority={priority} />
            ))}
          </FilterContent>

          <FilterActions>
            <FilterButton onPress={handleOpenFilterDrawer}>
              <Icon
                name="funnel-outline"
                size={20}
                color={
                  hasActiveFilters()
                    ? theme.colors.ACCENT_PRIMARY
                    : theme.colors.TEXT_PRIMARY
                }
              />
            </FilterButton>
            {hasActiveFilters() && (
              <ClearFilterButton onPress={clearAllFilters}>
                <Icon
                  name="close-outline"
                  size={20}
                  color={theme.colors.BACKGROUND_PRIMARY}
                />
              </ClearFilterButton>
            )}
          </FilterActions>
        </FilterSection>

        <Section>
          <Typography variant="subtitle1">Tarefas Recentes</Typography>
        </Section>
      </>
    ),
    [
      totalTodos,
      completedTodos,
      pendingTodos,
      activeFilter,
      handleFilterPress,
      theme,
      advancedFilters,
      handleOpenFilterDrawer,
      clearAllFilters,
      hasActiveFilters,
      waveAnimation,
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
