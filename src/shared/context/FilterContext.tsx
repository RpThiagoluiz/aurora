import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from 'react'
import { TodoFilter, AdvancedFilters } from '../types'
import { useTodos } from './TodoContext'

interface FilterContextData {
  activeFilter: TodoFilter
  advancedFilters: AdvancedFilters

  filteredTodos: any[]

  setActiveFilter: (filter: TodoFilter) => void
  setAdvancedFilters: (filters: AdvancedFilters) => void
  clearAllFilters: () => void
  hasActiveFilters: () => boolean

  totalTodos: number
  completedTodos: number
  pendingTodos: number
}

const FilterContext = createContext<FilterContextData>({} as FilterContextData)

interface FilterProviderProps {
  children: ReactNode
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const { todos } = useTodos()

  const [activeFilter, setActiveFilter] = useState<TodoFilter>('all')
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>({
    priorities: [],
    titleSearch: '',
  })

  const completedTodos = useMemo(
    () => todos.filter(todo => todo.completed).length,
    [todos],
  )
  const pendingTodos = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  )
  const totalTodos = todos.length

  const filteredTodos = useMemo(() => {
    let result = todos

    switch (activeFilter) {
      case 'completed':
        result = todos.filter(todo => todo.completed)
        break
      case 'pending':
        result = todos.filter(todo => !todo.completed)
        break
      default:
        result = todos
    }

    if (advancedFilters.priorities.length > 0) {
      result = result.filter(todo =>
        advancedFilters.priorities.includes(todo.priority),
      )
    }

    if (advancedFilters.titleSearch.trim()) {
      const searchTerm = advancedFilters.titleSearch.toLowerCase().trim()
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(searchTerm),
      )
    }

    return result
  }, [todos, activeFilter, advancedFilters])

  const hasActiveFilters = useCallback(() => {
    return (
      activeFilter !== 'all' ||
      advancedFilters.priorities.length > 0 ||
      advancedFilters.titleSearch.trim() !== ''
    )
  }, [
    activeFilter,
    advancedFilters.priorities.length,
    advancedFilters.titleSearch,
  ])

  const clearAllFilters = useCallback(() => {
    setActiveFilter('all')
    setAdvancedFilters({
      priorities: [],
      titleSearch: '',
    })
  }, [])

  const value: FilterContextData = {
    activeFilter,
    advancedFilters,
    filteredTodos,
    setActiveFilter,
    setAdvancedFilters,
    clearAllFilters,
    hasActiveFilters,
    totalTodos,
    completedTodos,
    pendingTodos,
  }

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  )
}

export const useFilter = (): FilterContextData => {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider')
  }
  return context
}
