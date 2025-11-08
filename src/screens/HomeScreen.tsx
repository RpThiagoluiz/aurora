import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

import { useTheme } from '../hooks'
import { Typography } from '../shared/components'

export const HomeScreen = () => {
  const { colors } = useTheme()

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
      gap: 12,
    },
    taskCard: {
      backgroundColor: colors.BACKGROUND_SECONDARY,
      padding: 16,
      borderRadius: 12,
      alignItems: 'center',
      gap: 4,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    statCard: {
      flex: 1,
      backgroundColor: colors.BACKGROUND_SECONDARY,
      padding: 16,
      borderRadius: 12,
      marginHorizontal: 4,
      alignItems: 'center',
    },
    statNumber: {
      marginBottom: 4,
    },
    statLabel: {
      textAlign: 'center',
    },
  })

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Typography variant="h2">Olá! 👋</Typography>
          <Typography variant="body1" color="secondary">
            Bem-vindo ao Aurora, seu gerenciador de tarefas inteligente.
          </Typography>
        </View>

        <View style={styles.section}>
          <Typography variant="subtitle1">Resumo de Hoje</Typography>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Typography variant="h1" style={styles.statNumber}>
                0
              </Typography>
              <Typography
                variant="caption"
                color="secondary"
                style={styles.statLabel}
              >
                Total de{'\n'}Tarefas
              </Typography>
            </View>
            <View style={styles.statCard}>
              <Typography
                variant="h1"
                color="success"
                style={styles.statNumber}
              >
                0
              </Typography>
              <Typography
                variant="caption"
                color="secondary"
                style={styles.statLabel}
              >
                Concluídas
              </Typography>
            </View>
            <View style={styles.statCard}>
              <Typography
                variant="h1"
                color="warning"
                style={styles.statNumber}
              >
                0
              </Typography>
              <Typography
                variant="caption"
                color="secondary"
                style={styles.statLabel}
              >
                Pendentes
              </Typography>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Typography variant="subtitle1">Tarefas Recentes</Typography>
          <View style={styles.taskCard}>
            <Typography variant="body1">Nenhuma tarefa encontrada</Typography>
            <Typography variant="caption" color="secondary">
              Adicione sua primeira tarefa usando o botão + abaixo
            </Typography>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
