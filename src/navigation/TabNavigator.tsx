import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { useTheme } from '../hooks'
import { SettingsScreen } from '../modules/settings'
import { HomeScreen, AddTodoScreen } from '../modules/todo'
import { Colors } from '../shared/types'

export type TabParamList = {
  Home: undefined
  AddTodo: undefined
  Settings: undefined
}

const Tab = createBottomTabNavigator<TabParamList>()

// Helper para criar estilos do tab navigator
const getTabBarStyles = (colors: Colors) => ({
  tabBarStyle: {
    backgroundColor: colors.BACKGROUND_SECONDARY,
    borderTopColor: colors.BACKGROUND_SECONDARY,
    borderTopWidth: 1,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingTop: 10,
    height: Platform.OS === 'ios' ? 90 : 70,
  },
  headerStyle: {
    backgroundColor: colors.BACKGROUND_PRIMARY,
    borderBottomColor: colors.BACKGROUND_SECONDARY,
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitleStyle: {
    color: colors.TEXT_PRIMARY,
    fontSize: 20,
    fontWeight: '600' as const,
  },
})

export const TabNavigator = () => {
  const { colors } = useTheme()

  const tabStyles = getTabBarStyles(colors)

  const renderTabIcon = (
    routeName: keyof TabParamList,
    focused: boolean,
    size: number,
  ) => {
    let iconName: string

    switch (routeName) {
      case 'Home':
        iconName = focused ? 'home' : 'home-outline'
        break
      case 'AddTodo':
        iconName = focused ? 'add-circle' : 'add-circle-outline'
        break
      case 'Settings':
        iconName = focused ? 'settings' : 'settings-outline'
        break
      default:
        iconName = 'help-outline'
    }

    return (
      <Icon
        name={iconName}
        size={size}
        color={focused ? colors.ACCENT_PRIMARY : colors.TEXT_SECONDARY}
      />
    )
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) =>
          renderTabIcon(route.name, focused, size),
        tabBarActiveTintColor: colors.ACCENT_PRIMARY,
        tabBarInactiveTintColor: colors.TEXT_SECONDARY,
        tabBarShowLabel: false,
        headerTintColor: colors.TEXT_PRIMARY,
        ...tabStyles,
      })}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="AddTodo"
        component={AddTodoScreen}
        options={{
          headerTitle: 'Nova Tarefa',
        }}
      />

      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: 'Aurora',
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: 'Configurações',
        }}
      />
    </Tab.Navigator>
  )
}
