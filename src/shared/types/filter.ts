export type TodoFilter = 'all' | 'completed' | 'pending'

export interface FilterOption {
  key: TodoFilter
  label: string
  count: number
  color: string
}

export interface AdvancedFilters {
  priorities: Array<'low' | 'medium' | 'high'>
  titleSearch: string
}

export interface FilterDrawerProps {
  isVisible: boolean
  onClose: () => void
  filters: AdvancedFilters
  onFiltersChange: (filters: AdvancedFilters) => void
  onClearFilters: () => void
}
