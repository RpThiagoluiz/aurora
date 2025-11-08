import React from 'react'
import { StyleSheet, View } from 'react-native'

import { useTheme } from '../../../hooks'
import { Typography } from '../../../shared/components'

export const SettingsScreen = () => {
  const { colors } = useTheme()

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.BACKGROUND_PRIMARY,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })

  return (
    <View style={styles.container}>
      <Typography variant="h2">Configurações</Typography>
    </View>
  )
}
