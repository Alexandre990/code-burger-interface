/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Link, useHistory } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { useUser } from '../../hooks/UserContext'
import { Button, ErrorMessage } from '../../components'
import api from '../../services/api'
import LoginImg from '../../assets/login-image.svg'
import Logo from '../../assets/logo.svg'

import {
  Container,
  LoginImage,
  ContainerItens,
  Label,
  Input,
  SignInLink,
  
} from './styles'

export function Login() {
  const history = useHistory()

  const { putUserData } = useUser()

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('O e-mail é obrigatório'),
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha deve ter no mínimo 6 dígitos'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (clientData) => {
    const { data } = await toast.promise(
      api.post('sessions', {
        email: clientData.email,
        password: clientData.password,
      }),
      {
        pending: 'Verificando seus dados',
        success: 'Seja bem-vindo(a) 👌',
        error: 'Verifique seus dados 🤯',
      }
    )

    putUserData(data)

    setTimeout(() => {
      if (data.admin) {
        history.push('/pedidos')
      } else {
        history.push('/')
      }
    }, 1000)
  }

  return (
    <Container>
      <LoginImage src={LoginImg} alt="login-image"></LoginImage>
      <ContainerItens>
        <img src={Logo} alt="logo-code-burger"></img>
        <h1>Login</h1>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Label>Email</Label>
          <Input
            type="email"
            {...register('email')}
            error={errors.email?.message}
          ></Input>
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <Label>Senha</Label>
          <Input
            type="password"
            {...register('password')}
            error={errors.password?.message}
          ></Input>
          <ErrorMessage>{errors.password?.message}</ErrorMessage>

          <Button type="submit" style={{ marginTop: 75, marginBotton: 25 }}>
            Sign In
          </Button>
        </form>
        <SignInLink>
          Não possui conta? <Link to="/cadastro"> Sign Up</Link>
        </SignInLink>
      </ContainerItens>
    </Container>
  )
}
