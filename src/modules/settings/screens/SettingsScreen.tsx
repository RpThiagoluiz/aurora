import React from 'react'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Ionicons'

import { useTheme } from '../../../hooks'
import { Typography } from '../../../shared/components'
import { ThemeType } from '../../../shared/types'

const Container = styled.View`
  flex: 1;
  background-color: ${props => (props.theme as any).colors.BACKGROUND_PRIMARY};
`

const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  padding: 20px;
`

const Section = styled.View`
  margin-bottom: 32px;
`

const SectionTitle = styled.View`
  margin-bottom: 16px;
`

const OptionItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${props =>
    (props.theme as any).colors.BACKGROUND_SECONDARY};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 8px;
`

const OptionLeft = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`

const OptionIcon = styled.View`
  margin-right: 12px;
`

const OptionContent = styled.View`
  flex: 1;
`

const CheckIcon = styled.View`
  margin-left: 12px;
`

export const SettingsScreen = () => {
  const { colors, userThemeChoice, setThemeType } = useTheme()

  const themeOptions: { value: ThemeType; label: string; icon: string }[] = [
    {
      value: 'auto',
      label: 'Automático (Sistema)',
      icon: 'phone-portrait-outline',
    },
    { value: 'light', label: 'Claro', icon: 'sunny-outline' },
    { value: 'dark', label: 'Escuro', icon: 'moon-outline' },
  ]

  const handleThemeChange = (themeType: ThemeType) => {
    setThemeType(themeType)
  }

  return (
    <Container>
      <Content>
        <Section>
          <SectionTitle>
            <Typography variant="h3">Aparência</Typography>
          </SectionTitle>

          {themeOptions.map(option => (
            <OptionItem
              key={option.value}
              onPress={() => handleThemeChange(option.value)}
              activeOpacity={0.7}
            >
              <OptionLeft>
                <OptionIcon>
                  <Icon
                    name={option.icon}
                    size={24}
                    color={colors.ACCENT_PRIMARY}
                  />
                </OptionIcon>
                <OptionContent>
                  <Typography variant="body1">{option.label}</Typography>
                </OptionContent>
              </OptionLeft>

              {userThemeChoice === option.value && (
                <CheckIcon>
                  <Icon
                    name="checkmark-circle"
                    size={24}
                    color={colors.ACCENT_PRIMARY}
                  />
                </CheckIcon>
              )}
            </OptionItem>
          ))}
        </Section>
      </Content>
    </Container>
  )
}
