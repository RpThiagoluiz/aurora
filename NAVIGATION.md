# Navegação - Aurora

## 📋 Estrutura de Navegação

Sistema de navegação implementado com **React Navigation v6** usando Tab Navigation com **Ionicons**.

## 🏗️ Arquitetura da Navegação

### 📁 Estrutura de Pastas

```
src/
├── navigation/          # 🎯 Navegação centralizada
│   ├── AppNavigator.tsx    # Navigator principal com tema
│   ├── TabNavigator.tsx    # Bottom Tab Navigator
│   └── index.ts
├── screens/            # 📱 Telas gerais
│   ├── HomeScreen.tsx     # Tela principal
│   └── index.ts
└── modules/
    ├── todo/
    │   └── screens/    # 📝 Telas do módulo TODO
    │       ├── AddTodoScreen.tsx
    │       └── index.ts
    └── settings/
        └── screens/    # ⚙️ Telas do módulo Settings
            ├── SettingsScreen.tsx
            └── index.ts
```

## 🎨 Telas Implementadas

### 🏠 HomeScreen

- **Localização**: `src/screens/HomeScreen.tsx`
- **Função**: Tela principal com resumo de tarefas
- **Recursos**:
  - Dashboard com estatísticas
  - Lista de tarefas recentes
  - Cards informativos com tema aplicado
  - Layout responsivo com ScrollView

### ➕ AddTodoScreen

- **Localização**: `src/modules/todo/screens/AddTodoScreen.tsx`
- **Função**: Formulário para criação de novas tarefas
- **Recursos**:
  - Formulário completo com validação
  - Seletor de prioridade visual
  - Campos título e descrição
  - Botão de salvamento estilizado

### ⚙️ SettingsScreen

- **Localização**: `src/modules/settings/screens/SettingsScreen.tsx`
- **Função**: Tela de configurações da aplicação
- **Recursos**:
  - Interface minimalista
  - Typography component para texto
  - Layout centralizado

## 🎯 Tab Navigation

### Configuração

- **3 Tabs**: Home, AddTodo e Settings
- **Sem Labels**: Apenas ícones Ionicons
- **Ícones**:
  - 🏠 Home: `home` / `home-outline`
  - ➕ AddTodo: `add-circle` / `add-circle-outline`
  - ⚙️ Settings: `settings` / `settings-outline`
- **Estados**: Ícone preenchido quando ativo, outline quando inativo
- **Cores**: `ACCENT_PRIMARY` quando focado, `TEXT_SECONDARY` quando não focado

### Tema Integrado

- Cores do sistema de tema aplicadas
- Headers customizados
- Tab bar com tema escuro
- Transições suaves

## 🔧 Como Usar

### Navegação Programática

```tsx
import { useNavigation } from '@react-navigation/native'
import { TabParamList } from '../navigation'

const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>()

// Navegar para Home
navigation.navigate('Home')

// Navegar para AddTodo
navigation.navigate('AddTodo')

// Navegar para Settings
navigation.navigate('Settings')
```

### Acessar Parâmetros de Rota

```tsx
import { useRoute } from '@react-navigation/native'

const route = useRoute<RouteProp<TabParamList, 'Home'>>()
```

## 🚀 Recursos Avançados

✅ **Tema Integrado** - Cores sincronizadas com sistema de tema  
✅ **TypeScript Tipado** - Navegação completamente tipada  
✅ **Headers Customizados** - Estilização consistente  
✅ **Safe Area** - Compatibilidade com notch/home indicator  
✅ **Platform Specific** - Ajustes para iOS/Android  
✅ **Navigation Theme** - Tema específico do React Navigation

## 📱 Layout Responsivo

- **iOS**: Tab bar com padding extra para home indicator
- **Android**: Tab bar otimizada para navigation bar
- **Headers**: Altura e estilização específica por plataforma
- **Safe Area**: Gerenciamento automático de áreas seguras

## 🔮 Próximas Melhorias

- [ ] Adicionar Stack Navigation para sub-telas
- [ ] Implementar Deep Linking
- [ ] Animações customizadas entre telas
- [ ] Drawer Navigation para configurações
- [ ] Modal navigation para ações rápidas
