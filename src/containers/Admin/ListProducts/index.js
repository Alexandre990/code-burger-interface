/* eslint-disable no-undef */
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import api from '../../../services/api'
import { useHistory } from 'react-router-dom'

import { Container, Img, EditIconStyles } from './styles'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CancelIcon from '@mui/icons-material/Cancel'
import formatCurrency from '../../../utils/formatCurrency'
import paths from '../../../constants/paths'

function ListProducts() {
  const [products, setProducts] = useState()
  const { push } = useHistory()

  useEffect(() => {
    async function loadOrders() {
      const { data } = await api.get('products')

      setProducts(data)
    }

    loadOrders()
  }, [])

  function isOffer(offerStatus) {
    if (offerStatus) {
      return <CheckBoxIcon style={{ color: '#228822' }}></CheckBoxIcon>
    }
    return <CancelIcon style={{ color: '#cc1717' }}></CancelIcon>
  }

  function editProduct(product) {
    push(paths.EditProduct, { product })
  }

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell align="center">Produto em Oferta</TableCell>
              <TableCell align="center">Imagem do Produto</TableCell>
              <TableCell>Editar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products &&
              products.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell>{formatCurrency(product.price)}</TableCell>
                  <TableCell align="center">{isOffer(product.offer)}</TableCell>
                  <TableCell align="center">
                    <Img src={product.url} alt="imagem do produto"></Img>
                  </TableCell>
                  <TableCell>
                    <EditIconStyles
                      onClick={() => editProduct(product)}
                    ></EditIconStyles>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default ListProducts
