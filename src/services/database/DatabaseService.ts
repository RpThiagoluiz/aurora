import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = 'aurora.todos'

export interface Todo {
  id: string
  title: string
  description?: string
  priority: 'low' | 'medium' | 'high'
  completed: boolean
  createdAt: string
  updatedAt: string
}

export type TodoList = Todo[]

export const getTodos = async (): Promise<TodoList> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
    return jsonValue != null ? JSON.parse(jsonValue) : []
  } catch (error) {
    console.error('Erro ao buscar todos:', error)
    return []
  }
}

export const setTodos = async (todos: TodoList): Promise<boolean> => {
  try {
    const jsonValue = JSON.stringify(todos)
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
    return true
  } catch (error) {
    console.error('Erro ao salvar todos:', error)
    return false
  }
}

export const removeTodos = async (): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY)
    return true
  } catch (error) {
    console.error('Erro ao remover todos:', error)
    return false
  }
}

export const clearStorage = async (): Promise<boolean> => {
  try {
    await AsyncStorage.clear()
    return true
  } catch (error) {
    console.error('Erro ao limpar storage:', error)
    return false
  }
}

export const getStorageInfo = async (): Promise<{
  storageKey: string
  itemCount: number
  totalSize: number
}> => {
  try {
    const todos = await getTodos()
    const jsonString = JSON.stringify(todos)

    return {
      storageKey: STORAGE_KEY,
      itemCount: todos.length,
      totalSize: new Blob([jsonString]).size,
    }
  } catch (error) {
    console.error('Erro ao obter info do storage:', error)
    return {
      storageKey: STORAGE_KEY,
      itemCount: 0,
      totalSize: 0,
    }
  }
}
