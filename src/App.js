import React, { Component, Fragment } from 'react'
import { NavLink, Route } from 'react-router-dom'

import AdminPage from './components/routes/admin'
import AuthPage from './components/routes/auth'
import PrivateRoute from './components/common/private-route'
import CustomDragLayer from './components/common/custom-drag-layer'

class App extends Component {
  render() {
    const activeStyle = { color: 'red' }

    return (
      <Fragment>
        <CustomDragLayer />
        <div>
          <NavLink to="/admin" activeStyle={activeStyle}>
            Admin
          </NavLink>
        </div>
        <div>
          <NavLink to="/auth/sign-in" activeStyle={activeStyle}>
            Sign In
          </NavLink>
        </div>
        <div>
          <NavLink to="/auth/sign-up" activeStyle={activeStyle}>
            Sign Up
          </NavLink>
        </div>
        <div>
          <PrivateRoute path="/admin" component={AdminPage} />
          <Route path="/auth" component={AuthPage} />
        </div>
      </Fragment>
    )
  }
}

export default App
