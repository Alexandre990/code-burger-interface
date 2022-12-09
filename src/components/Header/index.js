import React from 'react'
import { useHistory } from 'react-router-dom'

import { useUser } from '../../hooks/UserContext'

import Person from '../../assets/person.svg'
import Cart from '../../assets/cart.svg'

import {
  Container,
  ContainerLeft,
  PageLink,
  ContainerRight,
  ContaierText,
  Line,
  PageLinkExit,
} from './styles'

export function Header() {
  const { logout, userData } = useUser()
  const {
    push,
    location: { pathname },
  } = useHistory()

  const logoutUser = () => {
    logout()
    push('/')
  }

  return (
    <Container>
      <ContainerLeft>
        <PageLink onClick={() => push('/')} isActive={pathname === '/'}>
          Início
        </PageLink>
        <PageLink
          onClick={() => push('/produtos')}
          isActive={pathname.includes('produtos')}
        >
          Ver produtos
        </PageLink>
      </ContainerLeft>

      <ContainerRight>
        <PageLink onClick={() => push('/carrinho')}>
          <img src={Cart} alt="carrinho"></img>
        </PageLink>
        <Line></Line>
        <PageLink>
          <img src={Person} alt="logo da pessoa"></img>
        </PageLink>
        <ContaierText>
          <p>Olá, {userData.name}</p>
          <PageLinkExit onClick={logoutUser}>Sair</PageLinkExit>
        </ContaierText>
      </ContainerRight>
    </Container>
  )
}
