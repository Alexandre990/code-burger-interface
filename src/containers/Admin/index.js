import React from 'react'

import { Container, ContainerItems } from './styles'
import Orders from './Orders'
import ListProducts from './ListProducts'
import { SideMenuAdmin } from '../../components'
import PropTypes from 'prop-types'
import paths from '../../constants/paths'
import NewProduct from './NewProduct'
import EditProduct from './EditProduct'

export function Admin({ match: { path } }) {
  return (
    <Container>
      <SideMenuAdmin path={path}></SideMenuAdmin>
      <ContainerItems></ContainerItems>
      {path === paths.Order && <Orders></Orders>}
      {path === paths.Products && <ListProducts></ListProducts>}
      {path === paths.NewProduct && <NewProduct></NewProduct>}
      {path === paths.EditProduct && <EditProduct></EditProduct>}
    </Container>
  )
}

Admin.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }),
}
