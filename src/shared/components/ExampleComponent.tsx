import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { useTheme } from '../../hooks'

export const ExampleComponent = () => {
  const { colors } = useTheme()

  const themedStyles = StyleSheet.create({
    container: {
      padding: 16,
      borderRadius: 8,
      margin: 16,
      backgroundColor: colors.BACKGROUND_SECONDARY,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      color: colors.TEXT_PRIMARY,
    },
    subtitle: {
      fontSize: 14,
      marginBottom: 16,
      color: colors.TEXT_SECONDARY,
    },
    statusComplete: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 4,
      marginBottom: 8,
      backgroundColor: colors.STATUS_COMPLETE,
    },
    statusDelete: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 4,
      backgroundColor: colors.STATUS_DELETE,
    },
    statusText: {
      color: '#000',
      fontWeight: '500',
    },
  })

  return (
    <View style={themedStyles.container}>
      <Text style={themedStyles.title}>Exemplo de Tema</Text>
      <Text style={themedStyles.subtitle}>Sistema de cores implementado</Text>
      <View style={themedStyles.statusComplete}>
        <Text style={themedStyles.statusText}>Completo</Text>
      </View>
      <View style={themedStyles.statusDelete}>
        <Text style={themedStyles.statusText}>Deletar</Text>
      </View>
    </View>
  )
}
