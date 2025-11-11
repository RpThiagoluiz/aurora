import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { useTheme } from '../hooks'
import { TodoDetailScreen } from '../modules/todo/screens/TodoDetailScreen'
import { FilterScreen } from '../modules/todo/screens/FilterScreen'
import { TabNavigator } from './TabNavigator'

export type RootStackParamList = {
  Main: undefined
  TodoDetail: { todoId: string }
  Filter: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export const StackNavigator = () => {
  const { colors } = useTheme()

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.BACKGROUND_PRIMARY,
        },
        headerTintColor: colors.TEXT_PRIMARY,
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TodoDetail"
        component={TodoDetailScreen}
        options={{
          title: 'Detalhes da Tarefa',
          presentation: 'modal',
          animationTypeForReplace: 'push',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name="Filter"
        component={FilterScreen}
        options={{
          headerShown: false,
          presentation: 'modal',
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  )
}
