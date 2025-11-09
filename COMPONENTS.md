# Componentes - Aurora

Documentação completa dos componentes reutilizáveis da aplicação Aurora.

## 📋 Índice

- [Button](#button-component)
- [Typography](#typography-component)

---

## Button Component

### 📋 Visão Geral

Componente Button reutilizável e totalmente customizável com suporte a variants, ícones, estados de loading e integração completa com o sistema de tema.

### 🎨 Variants Disponíveis

#### Primary (Padrão)

- **Cor de fundo**: `ACCENT_PRIMARY` (#0A84FF)
- **Cor do texto**: Branco (#FFFFFF)
- **Uso**: Ações principais como "Salvar", "Confirmar", "Enviar"

#### Secondary

- **Cor de fundo**: `BACKGROUND_SECONDARY` (#1E1E1E)
- **Cor da borda**: `TEXT_SECONDARY` (#A0A0A0)
- **Cor do texto**: `TEXT_PRIMARY` (#E0E0E0)
- **Uso**: Ações secundárias como "Cancelar", "Limpar", "Voltar"

### 🔧 Props Disponíveis

```tsx
interface ButtonProps extends TouchableOpacityProps {
  title: string // Texto do botão (obrigatório)
  variant?: 'primary' | 'secondary' // Variante do botão
  icon?: string // Emoji ou ícone como string
  loading?: boolean // Estado de carregamento
  fullWidth?: boolean // Ocupar largura total disponível
  disabled?: boolean // Estado desabilitado
}
```

### 📱 Exemplos de Uso

#### Básico

```tsx
import { Button } from '../shared/components'

// Botão primário simples
<Button title="Salvar" onPress={handleSave} />

// Botão secundário
<Button
  title="Cancelar"
  variant="secondary"
  onPress={handleCancel}
/>
```

#### Com Ícone

```tsx
// Botão com emoji
<Button
  title="Salvar"
  icon="💾"
  onPress={handleSave}
/>

// Botão de delete
<Button
  title="Excluir"
  variant="secondary"
  icon="🗑️"
  onPress={handleDelete}
/>
```

#### Estados Especiais

```tsx
// Loading state
<Button
  title="Salvando..."
  loading={isSubmitting}
  onPress={handleSave}
/>

// Largura total
<Button
  title="Continuar"
  fullWidth
  onPress={handleContinue}
/>

// Desabilitado
<Button
  title="Indisponível"
  disabled
  onPress={handleAction}
/>
```

#### Layout Flexível

```tsx
// Botões lado a lado
<View style={{ flexDirection: 'row', gap: 12 }}>
  <Button
    title="Cancelar"
    variant="secondary"
    fullWidth
    onPress={handleCancel}
  />
  <Button title="Salvar" fullWidth onPress={handleSave} />
</View>
```

### ✅ Features

- **Variants**: Primary e Secondary com estilos pré-definidos
- **Loading State**: Animação e texto personalizável durante carregamento
- **Icon Support**: Emojis ou ícones como string
- **Full Width**: Ocupa toda largura disponível do container
- **Disabled State**: Estado desabilitado com feedback visual
- **Theme Integration**: Cores automáticas baseadas no tema atual
- **Accessibility**: Suporte completo a acessibilidade
- **Type Safety**: Tipagem completa com TypeScript

---

## Typography Component

### 🎯 Objetivo

Componente centralizado para gerenciar toda a tipografia da aplicação Aurora, padronizando estilos e facilitando manutenção.

### 🎨 Variantes Disponíveis

#### Headers

- `h1`: 32px, bold, line-height 40px
- `h2`: 28px, bold, line-height 36px
- `h3`: 24px, semibold, line-height 32px

#### Subtítulos

- `subtitle1`: 18px, semibold, line-height 24px
- `subtitle2`: 16px, semibold, line-height 22px

#### Body Text

- `body1`: 16px, regular, line-height 22px (padrão)
- `body2`: 14px, regular, line-height 20px

#### Utilitários

- `caption`: 12px, regular, line-height 16px
- `overline`: 10px, medium, uppercase, line-height 14px
- `button`: 14px, semibold, line-height 20px

### 🌈 Cores Disponíveis

- `primary`: Texto principal (padrão)
- `secondary`: Texto secundário
- `error`: Cor de erro
- `success`: Cor de sucesso
- `warning`: Cor de aviso
- `accent`: Cor de destaque

### 🔧 Props Disponíveis

```tsx
interface TypographyProps extends TextProps {
  variant?: TypographyVariant
  color?: 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'accent'
  children: React.ReactNode
}
```

### 📝 Exemplos de Uso

#### Básico

```tsx
import { Typography } from '../shared/components'

// Texto padrão (body1, primary)
<Typography>Texto padrão</Typography>

// Título principal
<Typography variant="h2">Título Principal</Typography>

// Texto secundário
<Typography variant="body1" color="secondary">
  Texto explicativo
</Typography>
```

#### Headers e Estrutura

```tsx
// Estrutura de página
<View>
  <Typography variant="h1">Página Principal</Typography>
  <Typography variant="subtitle1" color="secondary">
    Descrição da página
  </Typography>

  <Typography variant="h3" style={{ marginTop: 24 }}>
    Seção Importante
  </Typography>
  <Typography variant="body1">Conteúdo da seção...</Typography>
</View>
```

#### Estados e Mensagens

```tsx
// Mensagem de erro
<Typography variant="caption" color="error">
  Campo obrigatório
</Typography>

// Mensagem de sucesso
<Typography variant="body2" color="success">
  Operação realizada com sucesso!
</Typography>

// Texto de warning
<Typography variant="caption" color="warning">
  Atenção: Esta ação não pode ser desfeita
</Typography>
```

#### Labels e Formulários

```tsx
// Labels de formulário
<Typography variant="subtitle2">Nome *</Typography>
<TextInput placeholder="Digite seu nome" />

<Typography variant="caption" color="secondary">
  Mínimo 2 caracteres
</Typography>
```

#### Estatísticas e Cards

```tsx
// Card de estatística
<View style={styles.statCard}>
  <Typography variant="h1" color="accent">
    42
  </Typography>
  <Typography variant="caption" color="secondary">
    Tarefas Concluídas
  </Typography>
</View>
```

### ✅ Features

- **Consistência**: Padronização automática de toda tipografia
- **Manutenção**: Alterações centralizadas no componente
- **Flexibilidade**: Suporte a estilos customizados
- **Type Safety**: Tipagem completa com TypeScript
- **Theme Integration**: Integração automática com sistema de cores
- **Scalability**: Fácil adição de novas variantes
- **Performance**: Otimização automática de re-renders

### 🔄 Migração

```tsx
// ❌ Antes
<Text style={styles.title}>Título</Text>
<Text style={[styles.subtitle, { color: colors.TEXT_SECONDARY }]}>
  Subtítulo
</Text>

// ✅ Depois
<Typography variant="h2">Título</Typography>
<Typography variant="body1" color="secondary">
  Subtítulo
</Typography>
```

---

## 🏗️ Arquitetura dos Componentes

### Estrutura de Pastas

```
src/shared/components/
├── Button.tsx
├── Typography.tsx
└── index.ts
```

### Exportação Centralizada

```tsx
// src/shared/components/index.ts
export { Button } from './Button'
export { Typography } from './Typography'
```

### Uso Padronizado

```tsx
// Import único para todos os componentes
import { Button, Typography } from '../shared/components'
```

## 🎯 Boas Práticas

1. **Sempre use Typography** ao invés de Text nativo
2. **Prefira variantes semânticas** (h1, h2) ao invés de estilos inline
3. **Use cores do sistema** (primary, secondary) ao invés de cores hardcoded
4. **Combine Button + Typography** para interfaces consistentes
5. **Mantenha espaçamentos** nos containers, não nos componentes
6. **Use fullWidth** no Button quando necessário para layouts responsivos

## 🚀 Próximos Passos

- [ ] Adicionar componente Input
- [ ] Implementar componente Card
- [ ] Criar sistema de Modal/Dialog
- [ ] Adicionar componente Loading
- [ ] Implementar componente Avatar
