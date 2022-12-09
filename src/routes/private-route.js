import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import PropTypes from 'prop-types'
import { Header } from '../components/Header'

function PrivateRoute({ component, isAdmin, ...rest }) {
  const user = localStorage.getItem('codeburger:userData')

  if (!user) {
    return <Redirect to="/login"></Redirect>
  }

  if (isAdmin && !JSON.parse(user).admin) {
    return <Redirect to="/"></Redirect>
  }
  return (
    <>
      {!isAdmin && <Header></Header>}
      <Route {...rest} component={component}></Route>
    </>
  )
}

export default PrivateRoute

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  isAdmin: PropTypes.bool,
}
