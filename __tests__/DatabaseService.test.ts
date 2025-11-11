/**
 * @format
 */

import AsyncStorage from '@react-native-async-storage/async-storage'
import { getTodos, setTodos } from '../src/services/database/DatabaseService'

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
)

describe('DatabaseService - AsyncStorage', () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
  })

  afterEach(async () => {
    await AsyncStorage.clear()
  })

  describe('Recuperação de dados do AsyncStorage', () => {
    it('deve retornar array vazio quando não há tarefas salvas', async () => {
      const todos = await getTodos()
      expect(todos).toEqual([])
    })

    it('deve recuperar tarefas salvas do AsyncStorage', async () => {
      const mockTodos = [
        {
          id: '1',
          title: 'Tarefa de teste',
          completed: false,
          priority: 'medium' as const,
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
        {
          id: '2',
          title: 'Segunda tarefa',
          completed: true,
          priority: 'high' as const,
          createdAt: '2024-01-01T01:00:00.000Z',
          updatedAt: '2024-01-01T01:00:00.000Z',
        },
      ]

      await AsyncStorage.setItem('aurora.todos', JSON.stringify(mockTodos))

      const todos = await getTodos()
      expect(todos).toHaveLength(2)
      expect(todos[0].title).toBe('Tarefa de teste')
      expect(todos[1].completed).toBe(true)
    })

    it('deve lidar com dados corrompidos no AsyncStorage', async () => {
      await AsyncStorage.setItem('aurora.todos', 'dados-invalidos')

      const todos = await getTodos()
      expect(todos).toEqual([])
    })

    it('deve salvar tarefas no AsyncStorage corretamente', async () => {
      const mockTodos = [
        {
          id: '1',
          title: 'Nova tarefa',
          completed: false,
          priority: 'high' as const,
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
      ]

      const success = await setTodos(mockTodos)
      expect(success).toBe(true)

      const storedData = await AsyncStorage.getItem('aurora.todos')
      const parsedData = JSON.parse(storedData || '[]')

      expect(parsedData).toHaveLength(1)
      expect(parsedData[0].title).toBe('Nova tarefa')
      expect(parsedData[0].priority).toBe('high')
    })

    it('deve manter integridade dos dados após múltiplas operações', async () => {
      const initialTodos = [
        {
          id: '1',
          title: 'Tarefa 1',
          completed: false,
          priority: 'medium' as const,
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
      ]

      await setTodos(initialTodos)

      const updatedTodos = [
        ...initialTodos,
        {
          id: '2',
          title: 'Tarefa 2',
          completed: true,
          priority: 'low' as const,
          createdAt: '2024-01-01T01:00:00.000Z',
          updatedAt: '2024-01-01T01:00:00.000Z',
        },
      ]

      await setTodos(updatedTodos)

      const finalTodos = await getTodos()
      expect(finalTodos).toHaveLength(2)
      expect(finalTodos.find(t => t.id === '1')?.title).toBe('Tarefa 1')
      expect(finalTodos.find(t => t.id === '2')?.completed).toBe(true)
    })

    it('deve retornar false em caso de erro no setTodos', async () => {
      const originalSetItem = AsyncStorage.setItem
      AsyncStorage.setItem = jest
        .fn()
        .mockRejectedValue(new Error('Storage error'))

      const mockTodos = [
        {
          id: '1',
          title: 'Tarefa com erro',
          completed: false,
          priority: 'low' as const,
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
      ]

      const success = await setTodos(mockTodos)
      expect(success).toBe(false)

      AsyncStorage.setItem = originalSetItem
    })
  })
})
