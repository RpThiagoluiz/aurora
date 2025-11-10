import React from 'react'
import styled from 'styled-components/native'
import { Modal, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Typography, Button } from '../../../shared/components'
import { useTheme } from '../../../hooks'
import { FilterDrawerProps } from '../../../shared/types'
import { getPriorityColor, getPriorityLabel } from '../../../shared/utils'

const { width } = Dimensions.get('window')
const DRAWER_WIDTH = width * 0.85

const Overlay = styled.TouchableOpacity`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-start;
  align-items: flex-start;
`

const DrawerContainer = styled.View`
  width: ${DRAWER_WIDTH}px;
  height: 100%;
  background-color: ${props => (props.theme as any).colors.BACKGROUND_PRIMARY};
  padding: 20px;
  padding-bottom: 80px;
  justify-content: space-between;
`

const DrawerContent = styled.ScrollView`
  flex: 1;
`

const DrawerHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
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

const Section = styled.View`
  margin-bottom: 24px;
`

const SearchInput = styled.TextInput`
  background-color: ${props =>
    (props.theme as any).colors.BACKGROUND_SECONDARY};
  border-radius: 12px;
  padding: 16px;
  color: ${props => (props.theme as any).colors.TEXT_PRIMARY};
  font-size: 16px;
  margin-top: 8px;
`

const PriorityContainer = styled.View`
  margin-top: 8px;
  gap: 12px;
`

const PriorityOption = styled.TouchableOpacity<{ isSelected: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background-color: ${props =>
    (props.theme as any).colors.BACKGROUND_SECONDARY};
  border-radius: 12px;
  border-width: 2px;
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

const ActionsContainer = styled.View`
  gap: 12px;
  padding-top: 16px;
  border-top-width: 1px;
  border-top-color: ${props =>
    (props.theme as any).colors.BACKGROUND_SECONDARY};
`

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isVisible,
  onClose,
  filters,
  onFiltersChange,
  onClearFilters,
}) => {
  const theme = useTheme()

  const handlePriorityToggle = (priority: 'low' | 'medium' | 'high') => {
    const newPriorities = filters.priorities.includes(priority)
      ? filters.priorities.filter(p => p !== priority)
      : [...filters.priorities, priority]

    onFiltersChange({
      ...filters,
      priorities: newPriorities,
    })
  }

  const handleTitleSearchChange = (text: string) => {
    onFiltersChange({
      ...filters,
      titleSearch: text,
    })
  }

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Overlay activeOpacity={1} onPress={onClose}>
        <DrawerContainer onStartShouldSetResponder={() => true}>
          <DrawerContent showsVerticalScrollIndicator={false}>
            <DrawerHeader>
              <Typography variant="h3">Filtros Avançados</Typography>
              <CloseButton onPress={onClose}>
                <Icon
                  name="close"
                  size={20}
                  color={theme.colors.TEXT_PRIMARY}
                />
              </CloseButton>
            </DrawerHeader>

            <Section>
              <Typography variant="subtitle1">Buscar por título</Typography>
              <SearchInput
                placeholder="Digite para buscar..."
                placeholderTextColor={theme.colors.TEXT_SECONDARY}
                value={filters.titleSearch}
                onChangeText={handleTitleSearchChange}
              />
            </Section>

            <Section>
              <Typography variant="subtitle1">
                Filtrar por prioridade
              </Typography>
              <PriorityContainer>
                {(['low', 'medium', 'high'] as const).map(priority => (
                  <PriorityOption
                    key={priority}
                    isSelected={filters.priorities.includes(priority)}
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
          </DrawerContent>

          <ActionsContainer>
            <Button
              title="Limpar Filtros"
              variant="secondary"
              onPress={onClearFilters}
              fullWidth
            />
          </ActionsContainer>
        </DrawerContainer>
      </Overlay>
    </Modal>
  )
}
