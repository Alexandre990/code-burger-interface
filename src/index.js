import React from 'react'
import ReactDOM from 'react-dom'
import { ToastContainer } from 'react-toastify'

import Routes from './routes/routes'
import GlobalStyles from './styles/globalStyles'
import AppProvider from './hooks'

ReactDOM.render(
  <>
    <AppProvider>
      <Routes></Routes>
    </AppProvider>
    <ToastContainer autoClose={2000}></ToastContainer>
    <GlobalStyles></GlobalStyles>
  </>,
  document.getElementById('root')
)
