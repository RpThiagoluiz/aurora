export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'high':
      return '#FF453A'
    case 'medium':
      return '#0A84FF'
    case 'low':
      return '#6FCF97'
    default:
      return '#A0A0A0'
  }
}

export const getPriorityLabel = (priority: string): string => {
  switch (priority) {
    case 'high':
      return 'Alta'
    case 'medium':
      return 'Média'
    case 'low':
      return 'Baixa'
    default:
      return 'Indefinida'
  }
}
