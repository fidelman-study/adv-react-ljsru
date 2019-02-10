import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { isAithorizedSelector } from '../../ducks/auth'

const PrivateRoute = ({ component: Component, isAithorized, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAithorized ? <Component {...props} /> : <h1>Not Authorized</h1>
    }
  />
)

export default connect(
  (state) => ({ isAithorized: isAithorizedSelector(state) }),
  null,
  null,
  { pure: false } // to be informed of changes
)(PrivateRoute)
