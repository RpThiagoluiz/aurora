import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert } from 'react-native'
import styled from 'styled-components/native'

import { Button, Typography } from '../../../shared/components'
import { useTodos } from '../../../shared/context'
import { TaskFormData, taskFormSchema } from '../../../shared/types'

// Styled Components
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

const ButtonsContainer = styled.View`
  flex-direction: row;
  gap: 12px;
  padding: 20px;
  margin-top: auto;
`

export const AddTodoScreen = () => {
  const { add } = useTodos()
  const [isSaving, setIsSaving] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'low' as const,
    },
  })

  const handleCancel = () => {
    const formValues = watch()
    const hasChanges =
      formValues.title.trim() ||
      (formValues.description && formValues.description.trim()) ||
      formValues.priority !== 'low'

    if (hasChanges) {
      Alert.alert(
        'Cancelar criação',
        'Você tem alterações não salvas. Deseja realmente cancelar?',
        [
          {
            text: 'Não',
            style: 'cancel',
          },
          {
            text: 'Sim',
            onPress: () => {
              reset()
            },
          },
        ],
      )
    }
  }

  const onSubmit = async (data: TaskFormData) => {
    setIsSaving(true)
    try {
      const success = await add({
        title: data.title,
        description: data.description || undefined,
        priority: data.priority,
        completed: false,
      })

      if (success) {
        Alert.alert('Sucesso', 'Tarefa criada com sucesso!', [
          {
            text: 'OK',
            onPress: () => {
              reset()
            },
          },
        ])
      } else {
        Alert.alert('Erro', 'Erro ao salvar a tarefa. Tente novamente.')
      }
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error)
      Alert.alert('Erro', 'Erro inesperado ao salvar a tarefa.')
    } finally {
      setIsSaving(false)
    }
  }

  const getPriorityColor = (selectedPriority: string) => {
    switch (selectedPriority) {
      case 'high':
        return '#FF453A' // STATUS_DELETE
      case 'medium':
        return '#0A84FF' // ACCENT_PRIMARY
      case 'low':
        return '#6FCF97' // STATUS_COMPLETE
      default:
        return '#A0A0A0' // TEXT_SECONDARY
    }
  }

  return (
    <Container>
      <Content>
        <Header>
          <Typography variant="h2">Nova Tarefa ✨</Typography>
          <Typography variant="body1" color="secondary">
            Adicione uma nova tarefa à sua lista
          </Typography>
        </Header>

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
                        {p === 'low'
                          ? 'Baixa'
                          : p === 'medium'
                            ? 'Média'
                            : 'Alta'}
                      </Typography>
                    </PriorityText>
                  </PriorityButton>
                ))}
              </PriorityContainer>
            )}
          />
        </Section>
      </Content>

      <ButtonsContainer>
        <Button
          title="Limpar"
          variant="secondary"
          iconName="trash-outline"
          onPress={handleCancel}
          fullWidth
          disabled={isSaving}
        />
        <Button
          title="Salvar"
          variant="primary"
          iconName="save-outline"
          onPress={handleSubmit(onSubmit)}
          fullWidth
          loading={isSaving}
        />
      </ButtonsContainer>
    </Container>
  )
}
