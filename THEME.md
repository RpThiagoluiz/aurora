# Sistema de Tema - Aurora

## 📋 Visão Geral

Sistema de tema centralizado e tipado para React Native, implementado com Context API e hooks customizados. Atualmente suporta apenas tema escuro (dark mode).

## 🔧 Como Usar

### 1. Configuração Básica

```tsx
import { ThemeProvider } from './src/shared'

function App() {
  return <ThemeProvider>{/* Seu app aqui */}</ThemeProvider>
}
```

### 2. Usando o Hook useTheme

```tsx
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from './src/hooks'

export const MyComponent = () => {
  const { colors } = useTheme()

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.BACKGROUND_SECONDARY,
      padding: 16,
    },
    title: {
      color: colors.TEXT_PRIMARY,
      fontSize: 18,
      fontWeight: 'bold',
    },
    subtitle: {
      color: colors.TEXT_SECONDARY,
      fontSize: 14,
    },
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Título</Text>
      <Text style={styles.subtitle}>Subtítulo</Text>
    </View>
  )
}
```

### 3. Alternativa com Estilos Inline

```tsx
import React from 'react'
import { Text, View } from 'react-native'
import { useTheme } from './src/hooks'

export const SimpleComponent = () => {
  const { colors } = useTheme()

  return (
    <View style={{ backgroundColor: colors.BACKGROUND_PRIMARY }}>
      <Text style={{ color: colors.TEXT_PRIMARY }}>
        Texto com tema aplicado
      </Text>
    </View>
  )
}
```

## 🏗️ Arquitetura

```
src/shared/
├── types/
│   └── theme.ts          # Interfaces e tipos do tema
├── constants/
│   └── theme.ts          # Definições de cores e temas
├── context/
│   └── ThemeContext.tsx  # Context Provider do tema
└── utils/
    └── theme.ts          # Utilitários para criação de estilos
```

## 📝 Benefícios

✅ **Centralizado**: Todas as cores em um local único  
✅ **Tipado**: TypeScript garante uso correto das cores  
✅ **Performático**: Usa Context API nativo do React  
✅ **Flexível**: Fácil adição de novos temas no futuro  
✅ **Consistente**: Padronização visual em toda aplicação
