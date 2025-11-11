import React from 'react'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Typography, Button } from '../../../shared/components'
import { useTheme } from '../../../hooks'
import { useFilter } from '../../../shared/context'
import { getPriorityColor, getPriorityLabel } from '../../../shared/utils'
import { useNavigation } from '@react-navigation/native'

const Container = styled.View`
  flex: 1;
  background-color: ${props => (props.theme as any).colors.BACKGROUND_PRIMARY};
`

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  padding-top: 60px;
  border-bottom-width: 1px;
  border-bottom-color: ${props =>
    (props.theme as any).colors.BACKGROUND_SECONDARY};
`

const CloseButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${props =>
    (props.theme as any).colors.BACKGROUND_SECONDARY};
  align-items: center;
  justify-content: center;
`

const Content = styled.View`
  flex: 1;
  padding: 20px;
`

const Section = styled.View`
  margin-bottom: 32px;
`

const SearchInput = styled.TextInput`
  background-color: ${props =>
    (props.theme as any).colors.BACKGROUND_SECONDARY};
  border-radius: 12px;
  padding: 16px;
  font-size: 16px;
  color: ${props => (props.theme as any).colors.TEXT_PRIMARY};
  margin-top: 12px;
`

const PriorityContainer = styled.View`
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
`

const PriorityOption = styled.TouchableOpacity<{ isSelected: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  border-radius: 12px;
  background-color: ${props =>
    props.isSelected
      ? (props.theme as any).colors.ACCENT_PRIMARY + '20'
      : (props.theme as any).colors.BACKGROUND_SECONDARY};
  border: 2px solid;
  border-color: ${props =>
    props.isSelected
      ? (props.theme as any).colors.ACCENT_PRIMARY
      : 'transparent'};
`

const PriorityIndicator = styled.View<{ color: string }>`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: ${props => props.color};
  margin-right: 12px;
`

const FooterActions = styled.View`
  padding: 20px;
  gap: 12px;
  border-top-width: 1px;
  border-top-color: ${props =>
    (props.theme as any).colors.BACKGROUND_SECONDARY};
`

const ScrollContainer = styled.ScrollView`
  flex: 1;
`

export const FilterScreen = () => {
  const theme = useTheme()
  const navigation = useNavigation()
  const {
    advancedFilters,
    setAdvancedFilters,
    clearAllFilters,
    hasActiveFilters,
  } = useFilter()

  const handleTitleSearchChange = (text: string) => {
    setAdvancedFilters({
      ...advancedFilters,
      titleSearch: text,
    })
  }

  const handlePriorityToggle = (priority: 'low' | 'medium' | 'high') => {
    const currentPriorities = advancedFilters.priorities
    const isSelected = currentPriorities.includes(priority)

    if (isSelected) {
      setAdvancedFilters({
        ...advancedFilters,
        priorities: currentPriorities.filter(p => p !== priority),
      })
    } else {
      setAdvancedFilters({
        ...advancedFilters,
        priorities: [...currentPriorities, priority],
      })
    }
  }

  const handleApplyFilters = () => {
    navigation.goBack()
  }

  const handleClearFilters = () => {
    clearAllFilters()
  }

  const handleClose = () => {
    navigation.goBack()
  }

  return (
    <Container>
      <Header>
        <Typography variant="h3">Filtros</Typography>
        <CloseButton onPress={handleClose}>
          <Icon
            name="close-outline"
            size={24}
            color={theme.colors.TEXT_PRIMARY}
          />
        </CloseButton>
      </Header>

      <ScrollContainer>
        <Content>
          <Section>
            <Typography variant="subtitle1">Buscar por título</Typography>
            <SearchInput
              placeholder="Digite o título da tarefa..."
              placeholderTextColor={theme.colors.TEXT_SECONDARY}
              value={advancedFilters.titleSearch}
              onChangeText={handleTitleSearchChange}
            />
          </Section>

          <Section>
            <Typography variant="subtitle1">Filtrar por prioridade</Typography>
            <PriorityContainer>
              {(['low', 'medium', 'high'] as const).map(priority => (
                <PriorityOption
                  key={priority}
                  isSelected={advancedFilters.priorities.includes(priority)}
                  onPress={() => handlePriorityToggle(priority)}
                >
                  <PriorityIndicator color={getPriorityColor(priority)} />
                  <Typography variant="body1">
                    {getPriorityLabel(priority)}
                  </Typography>
                </PriorityOption>
              ))}
            </PriorityContainer>
          </Section>
        </Content>
      </ScrollContainer>

      <FooterActions>
        {hasActiveFilters() && (
          <Button
            title="Limpar Filtros"
            onPress={handleClearFilters}
            variant="secondary"
          />
        )}
        <Button title="Fechar" onPress={handleApplyFilters} variant="primary" />
      </FooterActions>
    </Container>
  )
}
