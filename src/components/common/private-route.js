import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { isAithorizedSelector } from '../../ducks/auth'

const PrivateRoute = ({ component: Component, isAithorized, ...rest }) => (
    <Route {...rest} render={props => (
        isAithorized
            ? <Component {...props}/>
            : <Redirect to="/auth/sign-in" />
    )} />
)

export default connect(
    state => ({ isAithorized: isAithorizedSelector(state) }),
    null,
    null,
    { pure: false }, // to be informed of changes
)(PrivateRoute)