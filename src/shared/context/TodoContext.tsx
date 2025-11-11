import React, { createContext, useContext, useState, useCallback } from 'react'
import { getTodos, setTodos, Todo, TodoList } from '../../services/database'

interface TodoContextData {
  todos: TodoList
  isLoading: boolean
  get: () => Promise<void>
  add: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => Promise<boolean>
  edit: (
    id: string,
    updates: Partial<Omit<Todo, 'id' | 'createdAt'>>,
  ) => Promise<boolean>
  remove: (id: string) => Promise<boolean>
  toggle: (id: string) => Promise<boolean>
  clear: () => Promise<boolean>
}

const TodoContext = createContext<TodoContextData>({} as TodoContextData)

interface TodoProviderProps {
  children: React.ReactNode
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodosState] = useState<TodoList>([])
  const [isLoading, setIsLoading] = useState(false)

  const get = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await getTodos()
      setTodosState(data)
    } catch (error) {
      console.error('Erro ao carregar todos:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const add = useCallback(
    async (todoData: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
      try {
        const newTodo: Todo = {
          ...todoData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        const updatedTodos = [...todos, newTodo]
        const success = await setTodos(updatedTodos)

        if (success) {
          setTodosState(updatedTodos)
        }

        return success
      } catch (error) {
        console.error('Erro ao adicionar todo:', error)
        return false
      }
    },
    [todos],
  )

  const edit = useCallback(
    async (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => {
      try {
        const updatedTodos = todos.map(todo =>
          todo.id === id
            ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
            : todo,
        )

        const success = await setTodos(updatedTodos)

        if (success) {
          setTodosState(updatedTodos)
        }

        return success
      } catch (error) {
        console.error('Erro ao editar todo:', error)
        return false
      }
    },
    [todos],
  )

  const remove = useCallback(
    async (id: string) => {
      try {
        const updatedTodos = todos.filter(todo => todo.id !== id)
        const success = await setTodos(updatedTodos)

        if (success) {
          setTodosState(updatedTodos)
        }

        return success
      } catch (error) {
        console.error('Erro ao remover todo:', error)
        return false
      }
    },
    [todos],
  )

  const toggle = useCallback(
    async (id: string) => {
      try {
        const updatedTodos = todos.map(todo =>
          todo.id === id
            ? {
                ...todo,
                completed: !todo.completed,
                updatedAt: new Date().toISOString(),
              }
            : todo,
        )

        const success = await setTodos(updatedTodos)

        if (success) {
          setTodosState(updatedTodos)
        }

        return success
      } catch (error) {
        console.error('Erro ao alternar todo:', error)
        return false
      }
    },
    [todos],
  )

  const clear = useCallback(async () => {
    try {
      const success = await setTodos([])

      if (success) {
        setTodosState([])
      }

      return success
    } catch (error) {
      console.error('Erro ao limpar todos:', error)
      return false
    }
  }, [])

  const value = {
    todos,
    isLoading,
    get,
    add,
    edit,
    remove,
    toggle,
    clear,
  }

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

export const useTodos = () => {
  const context = useContext(TodoContext)

  if (!context) {
    throw new Error('useTodos deve ser usado dentro de um TodoProvider')
  }

  return context
}
