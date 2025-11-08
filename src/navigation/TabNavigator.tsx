import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Platform, StyleSheet, Text } from 'react-native'

import { useTheme } from '../hooks'
import { AddTodoScreen } from '../modules/todo'
import { HomeScreen } from '../screens'

export type TabParamList = {
  Home: undefined
  AddTodo: undefined
}

const Tab = createBottomTabNavigator<TabParamList>()

export const TabNavigator = () => {
  const { colors } = useTheme()

  const renderTabIcon = (
    routeName: keyof TabParamList,
    focused: boolean,
    size: number,
  ) => {
    let iconText: string

    switch (routeName) {
      case 'Home':
        iconText = '🏠'
        break
      case 'AddTodo':
        iconText = '➕'
        break
      default:
        iconText = '❓'
    }

    const iconStyles = StyleSheet.create({
      icon: {
        fontSize: size - 4,
        opacity: focused ? 1 : 0.6,
        color: focused ? colors.ACCENT_PRIMARY : colors.TEXT_SECONDARY,
      },
    })

    return <Text style={iconStyles.icon}>{iconText}</Text>
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) =>
          renderTabIcon(route.name, focused, size),
        tabBarActiveTintColor: colors.ACCENT_PRIMARY,
        tabBarInactiveTintColor: colors.TEXT_SECONDARY,
        tabBarStyle: {
          backgroundColor: colors.BACKGROUND_SECONDARY,
          borderTopColor: colors.BACKGROUND_SECONDARY,
          borderTopWidth: 1,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          paddingTop: 10,
          height: Platform.OS === 'ios' ? 90 : 70,
        },
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: colors.BACKGROUND_PRIMARY,
          borderBottomColor: colors.BACKGROUND_SECONDARY,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          color: colors.TEXT_PRIMARY,
          fontSize: 20,
          fontWeight: '600',
        },
        headerTintColor: colors.TEXT_PRIMARY,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: 'Aurora',
        }}
      />
      <Tab.Screen
        name="AddTodo"
        component={AddTodoScreen}
        options={{
          headerTitle: 'Nova Tarefa',
        }}
      />
    </Tab.Navigator>
  )
}
