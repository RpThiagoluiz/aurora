import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  Alert,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import { useTheme } from '../../../hooks'
import { Button, Typography } from '../../../shared/components'
import { TaskFormData, taskFormSchema } from '../../../shared/types'

export const AddTodoScreen = () => {
  const { colors } = useTheme()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
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

  const onSubmit = (_data: TaskFormData) => {
    Alert.alert('Sucesso', 'Tarefa criada com sucesso!', [
      {
        text: 'OK',
        onPress: () => {
          reset()
        },
      },
    ])
  }

  const getPriorityColor = (selectedPriority: string) => {
    switch (selectedPriority) {
      case 'high':
        return colors.STATUS_DELETE
      case 'medium':
        return colors.ACCENT_PRIMARY
      case 'low':
        return colors.STATUS_COMPLETE
      default:
        return colors.TEXT_SECONDARY
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.BACKGROUND_PRIMARY,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    header: {
      marginBottom: 24,
      gap: 8,
    },
    section: {
      marginBottom: 24,
      gap: 8,
    },
    input: {
      backgroundColor: colors.BACKGROUND_SECONDARY,
      borderRadius: 12,
      padding: 16,
      color: colors.TEXT_PRIMARY,
      fontSize: 16,
      minHeight: 56,
    },
    textArea: {
      minHeight: 100,
      textAlignVertical: 'top',
    },
    priorityContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    priorityButton: {
      flex: 1,
      backgroundColor: colors.BACKGROUND_SECONDARY,
      padding: 16,
      borderRadius: 12,
      marginHorizontal: 4,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: 'transparent',
    },
    priorityButtonActive: {
      borderColor: colors.ACCENT_PRIMARY,
    },
    priorityText: {
      marginTop: 4,
    },
    priorityIcon: {
      width: 20,
      height: 20,
      borderRadius: 10,
    },
    errorText: {
      marginTop: 4,
    },
    buttonsContainer: {
      flexDirection: 'row',
      gap: 12,
      paddingHorizontal: 20,
      paddingBottom: 20,
      marginTop: 'auto',
    },
  })

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Typography variant="h2">Nova Tarefa ✨</Typography>
          <Typography variant="body1" color="secondary">
            Adicione uma nova tarefa à sua lista
          </Typography>
        </View>
        <View style={styles.section}>
          <Typography variant="subtitle2">Título *</Typography>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  { borderColor: colors.BACKGROUND_SECONDARY },
                ]}
                placeholder="Digite o título da tarefa"
                placeholderTextColor={colors.TEXT_SECONDARY}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.title && (
            <Typography
              variant="caption"
              color="error"
              style={styles.errorText}
            >
              {errors.title.message}
            </Typography>
          )}
        </View>
        <View style={styles.section}>
          <Typography variant="subtitle2">Descrição (opcional)</Typography>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Adicione uma descrição detalhada..."
                placeholderTextColor={colors.TEXT_SECONDARY}
                value={value}
                onChangeText={onChange}
                multiline
                maxLength={500}
              />
            )}
          />
          {errors.description && (
            <Typography
              variant="caption"
              color="error"
              style={styles.errorText}
            >
              {errors.description.message}
            </Typography>
          )}
        </View>
        <View style={styles.section}>
          <Typography variant="subtitle2">Prioridade</Typography>
          <Controller
            control={control}
            name="priority"
            render={({ field: { onChange, value } }) => (
              <View style={styles.priorityContainer}>
                {(['low', 'medium', 'high'] as const).map(p => (
                  <TouchableOpacity
                    key={p}
                    style={[
                      styles.priorityButton,
                      value === p && styles.priorityButtonActive,
                    ]}
                    onPress={() => onChange(p)}
                  >
                    <View
                      style={[
                        styles.priorityIcon,
                        { backgroundColor: getPriorityColor(p) },
                      ]}
                    />
                    <Typography variant="body2" style={styles.priorityText}>
                      {p === 'low'
                        ? 'Baixa'
                        : p === 'medium'
                          ? 'Média'
                          : 'Alta'}
                    </Typography>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          />
        </View>
      </ScrollView>

      <View style={styles.buttonsContainer}>
        <Button
          title="Limpar"
          variant="secondary"
          iconName="trash-outline"
          onPress={handleCancel}
          fullWidth
        />
        <Button
          title="Salvar"
          variant="primary"
          iconName="save-outline"
          onPress={handleSubmit(onSubmit)}
          fullWidth
          loading={isSubmitting}
        />
      </View>
    </View>
  )
}
