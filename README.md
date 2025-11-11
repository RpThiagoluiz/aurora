# 🌅 Aurora - Todo App

## 📱 Sobre o Projeto

**Aurora** é um aplicativo completo de gerenciamento de tarefas desenvolvido em React Native CLI, criado como resposta ao teste técnico da **SuitPay**. O app demonstra conhecimentos avançados em React Native, gerenciamento de estado, persistência de dados e boas práticas de desenvolvimento móvel.

## ⏱️ Tempo de Desenvolvimento

**Tempo total investido: ~18 horas**

O projeto foi desenvolvido seguindo uma abordagem estruturada e iterativa. Como atuei nele durante alguns dias em horários não lineares eu acredito que foi mais ou menos esse tempo.

## 🎬 Demonstração

**📺 [Vídeo do App Funcionando](https://youtu.be/vkbUp4tk4y4)**

![Aurora Todo App Demo](https://img.shields.io/badge/Demo-YouTube-red?logo=youtube&logoColor=white)

## ✅ Funcionalidades Implementadas

### Funcionalidades Obrigatórias

- ✅ **Listagem de Tarefas**: Exibição completa com status visual e data de criação
- ✅ **Adicionar Tarefa**: Campo de input com validação para tarefas não vazias
- ✅ **Marcar como Concluída**: Alternância de status com indicação visual clara
- ✅ **Excluir Tarefa**: Remoção com confirmação via modal
- ✅ **Persistência**: AsyncStorage mantém dados após fechamento do app
- ✅ **Contador de Tarefas**: Exibição de totais (todas/concluídas/pendentes)

### Diferenciais Implementados

- 🎯 **Filtros Avançados**: Filtrar por status (todas/ativas/concluídas) com navegação dedicada
- ✏️ **Edição de Tarefas**: Editar título de tarefas existentes
- 🏷️ **Sistema de Prioridades**: Alta/Média/Baixa com cores diferenciadas
- 🔍 **Busca por Texto**: Campo de pesquisa para filtrar tarefas
- 🎨 **Animações Fluidas**:
  - Fade-in na listagem de tarefas
  - Crescimento animado do border-bottom nos cards de estatísticas
  - Animação de mão acenando na saudação
- 🌙 **Dark Theme**: Tema escuro elegante e consistente
- 📊 **Dashboard Estatístico**: Cards interativos com filtros visuais

## 🛠️ Tecnologias Utilizadas

### Core

- **React Native CLI** 0.82.1 (sem Expo)
- **TypeScript** - Tipagem estática completa
- **React Hooks** - useState, useEffect, useContext, useCallback, useMemo
- **AsyncStorage** - Persistência local de dados

### Navegação e Estado

- **React Navigation v7** - Stack e Tab navigation
- **Context API** - Gerenciamento de estado global (TodoContext, FilterContext, ThemeContext)
- **Styled Components** - Estilização component-based

### Formulários e Validação

- **React Hook Form** - Gerenciamento eficiente de formulários
- **Zod** - Validação robusta de schemas

### UI/UX e Animações

- **React Native Vector Icons** (Ionicons) - Ícones consistentes
- **Animated API** - Animações nativas performáticas
- **Safe Area Context** - Tratamento de áreas seguras

### Qualidade de Código

- **ESLint** + **Prettier** - Padronização e formatação
- **Husky** + **CommitLint** - Git hooks e commits convencionais
- **TypeScript Strict Mode** - Tipagem rigorosa

## 🏗️ Arquitetura do Projeto

O projeto segue uma arquitetura modular e escalável, organizada conforme sugerido no teste:

```
src/
├── shared/              # Componentes e utilitários compartilhados
│   ├── components/      # Button, Typography, Loading, Badges
│   ├── constants/       # Configurações de tema e cores
│   ├── context/         # Context providers (Theme, Todo, Filter)
│   ├── styles/          # Styled provider e configurações globais
│   ├── types/           # Interfaces TypeScript globais
│   └── utils/           # Utilitários para cores, datas, prioridades
├── modules/             # Módulos específicos por funcionalidade
│   ├── todo/           # Módulo principal de tarefas
│   │   ├── components/ # TaskCard, TaskForm
│   │   └── screens/    # HomeScreen, TodoDetailScreen, FilterScreen
│   └── settings/       # Módulo de configurações
├── navigation/          # Configuração de navegação
│   ├── AppNavigator.tsx    # Tab navigation principal
│   └── StackNavigator.tsx  # Stack navigation com modais
├── services/            # Camada de serviços
│   ├── database/       # DatabaseService com AsyncStorage
│   └── api/           # Preparado para APIs futuras
├── hooks/              # Custom hooks reutilizáveis
└── types/              # Definições TypeScript específicas
```

## 📚 Documentação Técnica

- **[📦 Componentes](./docs/COMPONENTS.md)** - Sistema de design e componentes
- **[🧭 Navegação](./docs/NAVIGATION.md)** - Estrutura de navegação
- **[🎨 Tema](./docs/THEME.md)** - Sistema de cores e temas
- **[📋 Especificações](./docs/challenger.md)** - Requisitos originais do teste

## Imagens

- **[🎨 Img](./docs/IMAGES.md)** - Prints das telas, mas aconselho a ver o **📺 [Vídeo do App](https://youtu.be/vkbUp4tk4y4)**

## 🚀 Como Executar o Projeto

### Pré-requisitos

> **Importante**: Certifique-se de ter completado o [Guia de Configuração do Ambiente React Native](https://reactnative.dev/docs/set-up-your-environment) antes de prosseguir.

- **Node.js** >= 20.x
- **React Native CLI** (não Expo)
- **Android Studio** (para Android)
- **Xcode** (para iOS - apenas macOS)

### Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/RpThiagoluiz/aurora.git
cd aurora
```

2. **Instale as dependências**

```bash
npm install
```

3. **Para iOS (apenas macOS)**

```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

### Executando o Projeto

1. **Inicie o Metro Server**

```bash
npm start
```

2. **Execute no Android**

```bash
npm run android
```

3. **Execute no iOS**

```bash
npm run ios
```

### Scripts Disponíveis

```bash
npm run android        # Executa no Android
npm run ios           # Executa no iOS
npm start             # Inicia o Metro bundler
npm test              # Executa os testes
npm run lint          # Executa o ESLint
npm run lint:fix      # Corrige problemas do ESLint automaticamente
npm run format        # Formata código com Prettier
npm run type-check    # Verifica tipagem TypeScript
npm run validate      # Executa todas as validações
```

## 🎨 Design System

### Paleta de Cores (Dark Theme)

- **Primary**: `#6366F1` - Índigo vibrante
- **Success**: `#10B981` - Verde sucesso
- **Warning**: `#F59E0B` - Laranja atenção
- **Error**: `#EF4444` - Vermelho erro
- **Background**: `#0F0F0F` / `#1A1A1A` - Fundos escuros
- **Text**: `#E5E7EB` / `#9CA3AF` - Textos claros

### Componentes Principais

- **Button**: Variantes com estados de loading e disabled
- **Typography**: Sistema completo (h1-h3, body1-body2, caption)
- **TaskCard**: Card de tarefa com status, prioridade e animações
- **PriorityBadge**: Badge colorido para nível de prioridade
- **StatusBadge**: Indicador visual de status da tarefa

## 📱 Funcionalidades Detalhadas

### Dashboard Principal

- Cards estatísticos interativos com animação de border
- Saudação personalizada com animação de mão
- Filtros rápidos (Todas/Concluídas/Pendentes)
- Listagem otimizada com FlatList e fade-in

### Gerenciamento de Tarefas

- Criação com validação em tempo real
- Edição inline do título
- Sistema de prioridades (Alta/Média/Baixa)
- Status visual claro (completa/pendente)
- Exclusão com confirmação

### Filtros e Busca

- Tela dedicada para filtros avançados
- Busca por texto em tempo real
- Filtro por prioridade
- Combinação múltipla de filtros
- Estado persistente entre sessões

### Persistência de Dados

- AsyncStorage para armazenamento local
- Salvamento automático em todas as operações
- Recovery de estado na inicialização
- Tratamento de erros de I/O

## 🧪 Testes e Qualidade

- **Testes Unitários**: Jest + React Native Testing Library
- **Linting**: ESLint com regras rigorosas
- **Formatação**: Prettier com configuração padronizada
- **Type Checking**: TypeScript em modo strict
- **Git Hooks**: Husky para validações pré-commit
- **Conventional Commits**: Padronização de mensagens

## 🔧 Desafios Encontrados e Soluções

### 1. **Construção de UI/UX Intuitiva**

- **Desafio**: Criar telas com um mínimo de UX para proporcionar uma boa experiência ao usuário
- **Solução**: Implementação de um design system consistente com feedback visual claro, animações suaves e navegação intuitiva entre as funcionalidades

### 2. **Configuração de Ícones no React Native CLI**

- **Desafio**: Vindo do dia a dia com Expo, a configuração de ícones diretamente no React Native nativo apresentou particularidades específicas
- **Solução**: Pesquisa aprofundada sobre react-native-vector-icons, configuração manual dos assets nativos e ajustes específicos para Android/iOS

### 3. **Animações Performáticas**

- **Desafio**: Animações suaves sem impacto na performance
- **Solução**: Animated API nativa com useNativeDriver quando possível

## 👨‍💻 Desenvolvedor

**Thiago Luiz**

- GitHub: [@RpThiagoluiz](https://github.com/RpThiagoluiz)
- LinkedIn: [Thiago Luiz](https://www.linkedin.com/in/thiago-luiz-0984191a7)

---

_Desenvolvido com ❤️ e React Native_
