export const formatTaskDate = (timestamp: string): string => {
  try {
    const timestampNumber = parseInt(timestamp, 10)

    if (isNaN(timestampNumber)) {
      return 'Data inválida'
    }

    const date = new Date(timestampNumber)

    if (isNaN(date.getTime())) {
      return 'Data inválida'
    }

    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    return `${day}/${month}/${year} ${hours}:${minutes}`
  } catch (error) {
    console.error('Erro ao formatar data:', error)
    return 'Data inválida'
  }
}

export const formatTaskDateCompact = (timestamp: string): string => {
  try {
    const timestampNumber = parseInt(timestamp, 10)

    if (isNaN(timestampNumber)) {
      return 'Data inválida'
    }

    const date = new Date(timestampNumber)

    if (isNaN(date.getTime())) {
      return 'Data inválida'
    }

    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    return `${day}/${month} ${hours}:${minutes}`
  } catch (error) {
    console.error('Erro ao formatar data:', error)
    return 'Data inválida'
  }
}
