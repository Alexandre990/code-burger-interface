import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import paths from '../constants/paths'

import { Home, Products, Register, Login, Cart, Admin } from '../containers'
import PrivateRoute from './private-route'

function Routes() {
  return (
    <Router>
      <Switch>
        <Route component={Login} path="/login"></Route>
        <Route component={Register} path="/cadastro"></Route>
        <PrivateRoute exact component={Home} path="/"></PrivateRoute>
        <PrivateRoute component={Products} path="/produtos"></PrivateRoute>
        <PrivateRoute component={Cart} path="/carrinho"></PrivateRoute>

        <PrivateRoute
          component={Admin}
          path={paths.Order}
          isAdmin
        ></PrivateRoute>
        <PrivateRoute
          component={Admin}
          path={paths.Products}
          isAdmin
        ></PrivateRoute>
        <PrivateRoute
          component={Admin}
          path={paths.NewProduct}
          isAdmin
        ></PrivateRoute>
        <PrivateRoute
          component={Admin}
          path={paths.EditProduct}
          isAdmin
        ></PrivateRoute>
      </Switch>
    </Router>
  )
}

export default Routes
