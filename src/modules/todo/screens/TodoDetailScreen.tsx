import { zodResolver } from '@hookform/resolvers/zod'
import { RouteProp, NavigationProp } from '@react-navigation/native'
import React, { useState, useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert } from 'react-native'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Ionicons'

import { RootStackParamList } from '../../../navigation/StackNavigator'
import {
  Button,
  Loading,
  Typography,
  PriorityBadge,
  StatusBadge,
} from '../../../shared/components'
import { useTodos } from '../../../shared/context'
import { TaskFormData, taskFormSchema } from '../../../shared/types'
import { getPriorityColor, getPriorityLabel } from '../../../shared/utils'

type TodoDetailRouteProp = RouteProp<RootStackParamList, 'TodoDetail'>
type TodoDetailNavigationProp = NavigationProp<RootStackParamList, 'TodoDetail'>

interface TodoDetailScreenProps {
  route: TodoDetailRouteProp
  navigation: TodoDetailNavigationProp
}

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

const Section = styled.View`
  margin-bottom: 24px;
  gap: 8px;
`

const StyledInput = styled.TextInput<{ hasError?: boolean }>`
  background-color: ${props =>
    (props.theme as any).colors.BACKGROUND_SECONDARY};
  border-radius: 12px;
  padding: 16px;
  color: ${props => (props.theme as any).colors.TEXT_PRIMARY};
  font-size: 16px;
  min-height: 56px;
  border-width: ${props => (props.hasError ? 2 : 0)}px;
  border-color: ${props =>
    props.hasError ? (props.theme as any).colors.STATUS_DELETE : 'transparent'};
`

const TextAreaInput = styled(StyledInput).attrs({
  textAlignVertical: 'top',
})`
  min-height: 100px;
`

const PriorityContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const PriorityButton = styled.TouchableOpacity<{ isActive: boolean }>`
  flex: 1;
  background-color: ${props =>
    (props.theme as any).colors.BACKGROUND_SECONDARY};
  padding: 16px;
  border-radius: 12px;
  margin: 0 4px;
  align-items: center;
  border-width: 2px;
  border-color: ${props =>
    props.isActive
      ? (props.theme as any).colors.ACCENT_PRIMARY
      : 'transparent'};
`

const PriorityIcon = styled.View<{ priorityColor: string }>`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${props => props.priorityColor};
`

const PriorityText = styled.View`
  margin-top: 4px;
`

const ErrorText = styled.View`
  margin-top: 4px;
`

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background-color: ${props =>
    (props.theme as any).colors.BACKGROUND_SECONDARY};
  border-bottom-width: 1px;
  border-bottom-color: ${props =>
    (props.theme as any).colors.BACKGROUND_PRIMARY};
`

const HeaderActions = styled.View`
  flex-direction: row;
  gap: 16px;
`

const IconButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: ${props => (props.theme as any).colors.BACKGROUND_PRIMARY};
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`

const BadgeGroup = styled.View`
  flex-direction: row;
  gap: 8px;
`

const CompleteButtonContainer = styled.View`
  padding: 20px;
  background-color: ${props => (props.theme as any).colors.BACKGROUND_PRIMARY};
  margin-bottom: 70px;
`

export const TodoDetailScreen: React.FC<TodoDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const { todoId } = route.params
  const { todos, edit, remove, toggle } = useTodos()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const todo = todos.find(t => t.id === todoId)

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'low' as const,
    },
  })

  useEffect(() => {
    if (todo) {
      reset({
        title: todo.title,
        description: todo.description || '',
        priority: todo.priority,
      })
      setIsLoading(false)
    } else {
      Alert.alert(
        'Tarefa não encontrada',
        'A tarefa que você está procurando não foi encontrada.',
        [{ text: 'OK', onPress: () => navigation.goBack() }],
      )
    }
  }, [todo, reset, navigation])

  // Monitora os valores atuais do formulário
  const watchedValues = watch()

  // Detecta se houve mudanças comparando com os dados originais
  const hasChanges = useMemo(() => {
    if (!todo) return false

    return (
      watchedValues.title !== todo.title ||
      watchedValues.description !== (todo.description || '') ||
      watchedValues.priority !== todo.priority
    )
  }, [watchedValues, todo])

  const handleSaveConfirmation = (data: TaskFormData) => {
    Alert.alert(
      'Confirmar alterações',
      'Tem certeza que deseja salvar as alterações?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Salvar',
          onPress: () => onSubmit(data),
        },
      ],
    )
  }

  const onSubmit = async (data: TaskFormData) => {
    if (!todo) return

    setIsSaving(true)
    try {
      const success = await edit(todo.id, {
        title: data.title,
        description: data.description || undefined,
        priority: data.priority,
      })

      if (success) {
        Alert.alert('Sucesso', 'Tarefa atualizada com sucesso!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ])
      } else {
        Alert.alert('Erro', 'Erro ao atualizar a tarefa. Tente novamente.')
      }
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error)
      Alert.alert('Erro', 'Erro inesperado ao atualizar a tarefa.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleToggleComplete = async () => {
    if (!todo) return

    const success = await toggle(todo.id)
    if (!success) {
      Alert.alert('Erro', 'Erro ao alterar status da tarefa.')
    }
  }

  const handleDelete = () => {
    if (!todo) return

    if (todo.completed) {
      Alert.alert(
        'Não é possível excluir',
        'Tarefas concluídas não podem ser excluídas.',
      )
      return
    }

    Alert.alert(
      'Excluir Tarefa',
      'Tem certeza que deseja excluir esta tarefa? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const success = await remove(todo.id)
            if (success) {
              Alert.alert('Sucesso', 'Tarefa excluída com sucesso!', [
                { text: 'OK', onPress: () => navigation.goBack() },
              ])
            } else {
              Alert.alert('Erro', 'Erro ao excluir a tarefa.')
            }
          },
        },
      ],
    )
  }

  if (isLoading || !todo) {
    return (
      <Container>
        <Loading size="large" />
      </Container>
    )
  }

  return (
    <Container>
      <HeaderContainer>
        <HeaderActions>
          <IconButton
            onPress={handleDelete}
            disabled={isSaving || todo.completed}
          >
            <Icon
              name="trash-outline"
              size={24}
              color={todo.completed ? '#A0A0A0' : '#FF453A'}
            />
          </IconButton>
          <IconButton
            onPress={handleSubmit(handleSaveConfirmation)}
            disabled={isSaving || !hasChanges}
          >
            <Icon
              name="save-outline"
              size={24}
              color={!hasChanges || isSaving ? '#A0A0A0' : '#0A84FF'}
            />
          </IconButton>
        </HeaderActions>

        <BadgeGroup>
          <PriorityBadge priority={todo.priority} />
          <StatusBadge completed={todo.completed} />
        </BadgeGroup>
      </HeaderContainer>

      <Content>
        <Section>
          <Typography variant="subtitle2">Título *</Typography>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <StyledInput
                placeholder="Digite o título da tarefa"
                placeholderTextColor="#A0A0A0"
                value={value}
                onChangeText={onChange}
                hasError={!!errors.title}
              />
            )}
          />
          {errors.title && (
            <ErrorText>
              <Typography variant="caption" color="error">
                {errors.title.message}
              </Typography>
            </ErrorText>
          )}
        </Section>

        <Section>
          <Typography variant="subtitle2">Descrição (opcional)</Typography>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <TextAreaInput
                placeholder="Adicione uma descrição detalhada..."
                placeholderTextColor="#A0A0A0"
                value={value}
                onChangeText={onChange}
                multiline
                maxLength={500}
                hasError={!!errors.description}
              />
            )}
          />
          {errors.description && (
            <ErrorText>
              <Typography variant="caption" color="error">
                {errors.description.message}
              </Typography>
            </ErrorText>
          )}
        </Section>

        <Section>
          <Typography variant="subtitle2">Prioridade</Typography>
          <Controller
            control={control}
            name="priority"
            render={({ field: { onChange, value } }) => (
              <PriorityContainer>
                {(['low', 'medium', 'high'] as const).map(p => (
                  <PriorityButton
                    key={p}
                    isActive={value === p}
                    onPress={() => onChange(p)}
                  >
                    <PriorityIcon priorityColor={getPriorityColor(p)} />
                    <PriorityText>
                      <Typography variant="body2">
                        {getPriorityLabel(p)}
                      </Typography>
                    </PriorityText>
                  </PriorityButton>
                ))}
              </PriorityContainer>
            )}
          />
        </Section>
      </Content>

      <CompleteButtonContainer>
        <Button
          title={todo.completed ? 'Reabrir Tarefa' : 'Marcar como Concluída'}
          variant={todo.completed ? 'secondary' : 'primary'}
          iconName={todo.completed ? 'refresh-outline' : 'checkmark-outline'}
          onPress={handleToggleComplete}
          fullWidth
          disabled={isSaving}
        />
      </CompleteButtonContainer>
    </Container>
  )
}
