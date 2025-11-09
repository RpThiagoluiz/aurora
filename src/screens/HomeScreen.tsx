import React from 'react'
import styled from 'styled-components/native'

import { Typography } from '../shared/components'

const Container = styled.View`
  flex: 1;
  background-color: ${props => (props.theme as any).colors.BACKGROUND_PRIMARY};
`

const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  padding: 20px;
`

const Header = styled.View`
  margin-bottom: 24px;
  gap: 8px;
`

const Section = styled.View`
  margin-bottom: 24px;
  gap: 12px;
`

const TaskCard = styled.View`
  background-color: ${props =>
    (props.theme as any).colors.BACKGROUND_SECONDARY};
  padding: 16px;
  border-radius: 12px;
  align-items: center;
  gap: 4px;
`

const StatsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const StatCard = styled.View`
  flex: 1;
  background-color: ${props =>
    (props.theme as any).colors.BACKGROUND_SECONDARY};
  padding: 16px;
  border-radius: 12px;
  margin: 0 4px;
  align-items: center;
`

const StatNumber = styled.View`
  margin-bottom: 4px;
`

const StatLabel = styled.View`
  text-align: center;
`

export const HomeScreen = () => {
  return (
    <Container>
      <Content>
        <Header>
          <Typography variant="h2">Olá! 👋</Typography>
          <Typography variant="body1" color="secondary">
            Bem-vindo ao Aurora, seu gerenciador de tarefas inteligente.
          </Typography>
        </Header>

        <Section>
          <Typography variant="subtitle1">Resumo de Hoje</Typography>
          <StatsContainer>
            <StatCard>
              <StatNumber>
                <Typography variant="h1">0</Typography>
              </StatNumber>
              <StatLabel>
                <Typography variant="caption" color="secondary">
                  Total de{'\n'}Tarefas
                </Typography>
              </StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>
                <Typography variant="h1" color="success">
                  0
                </Typography>
              </StatNumber>
              <StatLabel>
                <Typography variant="caption" color="secondary">
                  Concluídas
                </Typography>
              </StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>
                <Typography variant="h1" color="warning">
                  0
                </Typography>
              </StatNumber>
              <StatLabel>
                <Typography variant="caption" color="secondary">
                  Pendentes
                </Typography>
              </StatLabel>
            </StatCard>
          </StatsContainer>
        </Section>

        <Section>
          <Typography variant="subtitle1">Tarefas Recentes</Typography>
          <TaskCard>
            <Typography variant="body1">Nenhuma tarefa encontrada</Typography>
            <Typography variant="caption" color="secondary">
              Adicione sua primeira tarefa usando o botão + abaixo
            </Typography>
          </TaskCard>
        </Section>
      </Content>
    </Container>
  )
}
