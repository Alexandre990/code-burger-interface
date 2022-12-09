/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { Button, ErrorMessage } from '../../components'
import api from '../../services/api'
import RegisterImg from '../../assets/register-image.svg'
import Logo from '../../assets/logo.svg'

import {
  Container,
  RegisterImage,
  ContainerItens,
  Label,
  Input,
  SignInLink,
} from './styles'

export function Register() {
  const schema = Yup.object().shape({
    name: Yup.string().required('O seu nome é obrigatório'),
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('O e-mail é obrigatório'),
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha deve ter no mínimo 6 dígitos'),
    confirmPassword: Yup.string()
      .required('A senha é obrigatória')
      .oneOf([Yup.ref('password')], 'As senhas devem ser iguais'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (clientData) => {
    try {
      const { status } = await api.post(
        'users',
        {
          name: clientData.name,
          email: clientData.email,
          password: clientData.password,
        },
        { validateStatus: () => true }
      )

      if (status === 201 || status === 200) {
        toast.success('Cadastro criado com sucesso')
      } else if (status === 409) {
        toast.error('E-mail já cadastrado! Faça login para continuar')
      } else {
        throw new Error()
      }
    } catch (err) {
      toast.error('Falha no sistema! Tente novamente')
    }
  }

  return (
    <Container>
      <RegisterImage src={RegisterImg} alt="register-image"></RegisterImage>
      <ContainerItens>
        <img src={Logo} alt="logo-code-burger"></img>
        <h1>Cadastre-se</h1>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Label error={errors.name?.message}>Nome</Label>
          <Input
            type="text"
            {...register('name')}
            error={errors.name?.message}
          ></Input>
          <ErrorMessage>{errors.name?.message}</ErrorMessage>

          <Label error={errors.email?.message}>Email</Label>
          <Input
            type="email"
            {...register('email')}
            error={errors.email?.message}
          ></Input>
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <Label error={errors.password?.message}>Senha</Label>
          <Input
            type="password"
            {...register('password')}
            error={errors.password?.message}
          ></Input>
          <ErrorMessage>{errors.password?.message}</ErrorMessage>

          <Label error={errors.confirmPassword?.message}>Confirmar Senha</Label>
          <Input
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          ></Input>
          <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>

          <Button type="submit" style={{ marginTop: 25, marginBotton: 25 }}>
            Sign Up
          </Button>
        </form>
        <SignInLink>
          Já possui conta? <Link to="/login">Sign In</Link>
        </SignInLink>
      </ContainerItens>
    </Container>
  )
}
