import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import ProductsLogo from '../../assets/products-logo.svg'

import {
  Container,
  ProductsImg,
  CategoryButton,
  CategoryMenu,
  ProductsContainer,
} from './styles'

import api from '../../services/api'
import { CardProduct } from '../../components'
import formatCurrency from '../../utils/formatCurrency'

export function Products({ location: { state } }) {
  let categoryId = 0
  if (state?.categoryId) {
    categoryId = state.categoryId
  }

  const [categories, setCategories] = useState([])

  const [products, setProducts] = useState([])

  const [filteredProducts, setFilteredProducts] = useState([])

  const [activeCategory, setActiveCategories] = useState(categoryId)

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get('categories')

      const newCategories = [{ id: 0, name: 'Todas' }, ...data]

      setCategories(newCategories)
    }

    async function loadProducts() {
      const { data: allProducts } = await api.get('products')

      const newProducts = allProducts.map((product) => {
        return { ...product, formatedPrice: formatCurrency(product.price) }
      })

      setProducts(newProducts)
    }

    loadProducts()
    loadCategories()
  }, [])

  useEffect(() => {
    if (activeCategory === 0) {
      setFilteredProducts(products)
    } else {
      const newFilteredProducts = products.filter(
        (product) => product.category.id === activeCategory
      )

      setFilteredProducts(newFilteredProducts)
    }
  }, [activeCategory, products])

  return (
    <Container>
      <ProductsImg src={ProductsLogo} alt="logo da home"></ProductsImg>
      <CategoryMenu>
        {categories &&
          categories.map((category) => (
            <CategoryButton
              type="button"
              key={category.id}
              isActiveCategory={activeCategory === category.id}
              onClick={() => {
                setActiveCategories(category.id)
              }}
            >
              {category.name}
            </CategoryButton>
          ))}
      </CategoryMenu>
      <ProductsContainer>
        {filteredProducts &&
          filteredProducts.map((product) => (
            <CardProduct key={product.id} product={product}></CardProduct>
          ))}
      </ProductsContainer>
    </Container>
  )
}

Products.propTypes = {
  location: PropTypes.object,
}
