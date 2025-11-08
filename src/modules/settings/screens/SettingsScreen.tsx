import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { useTheme } from '../../../hooks'
import { Typography } from '../../../shared/components'
import { ThemeType } from '../../../shared/types'

export const SettingsScreen = () => {
  const { colors, userThemeChoice, setThemeType } = useTheme()

  const themeOptions: { value: ThemeType; label: string; icon: string }[] = [
    {
      value: 'auto',
      label: 'Automático (Sistema)',
      icon: 'phone-portrait-outline',
    },
    { value: 'light', label: 'Claro', icon: 'sunny-outline' },
    { value: 'dark', label: 'Escuro', icon: 'moon-outline' },
  ]

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.BACKGROUND_PRIMARY,
    },
    content: {
      padding: 20,
    },
    section: {
      marginBottom: 32,
    },
    sectionTitle: {
      marginBottom: 16,
    },
    optionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.BACKGROUND_SECONDARY,
      borderRadius: 12,
      padding: 16,
      marginBottom: 8,
    },
    optionLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    optionIcon: {
      marginRight: 12,
    },
    optionContent: {
      flex: 1,
    },
    checkIcon: {
      marginLeft: 12,
    },
  })

  const handleThemeChange = (themeType: ThemeType) => {
    setThemeType(themeType)
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Typography variant="h3" style={styles.sectionTitle}>
            Aparência
          </Typography>

          {themeOptions.map(option => (
            <TouchableOpacity
              key={option.value}
              style={styles.optionItem}
              onPress={() => handleThemeChange(option.value)}
              activeOpacity={0.7}
            >
              <View style={styles.optionLeft}>
                <Icon
                  name={option.icon}
                  size={24}
                  color={colors.ACCENT_PRIMARY}
                  style={styles.optionIcon}
                />
                <View style={styles.optionContent}>
                  <Typography variant="body1">{option.label}</Typography>
                </View>
              </View>

              {userThemeChoice === option.value && (
                <Icon
                  name="checkmark-circle"
                  size={24}
                  color={colors.ACCENT_PRIMARY}
                  style={styles.checkIcon}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}
