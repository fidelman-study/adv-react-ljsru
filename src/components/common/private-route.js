import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, user, ...rest }) => (
    <Route {...rest} render={props => (
        user
            ? <Component {...props}/>
            : <Redirect to="/auth/sign-in" />
    )} />
)

export default connect(state => {
    return { user: state.auth.user }
})(PrivateRoute)