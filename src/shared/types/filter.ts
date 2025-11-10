export type TodoFilter = 'all' | 'completed' | 'pending'

export interface FilterOption {
  key: TodoFilter
  label: string
  count: number
  color: string
}
