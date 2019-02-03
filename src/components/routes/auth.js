import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import SignInForm from '../auth/sign-in-form'
import SignUpForm from '../auth/sign-up-form'
import { signIn, signUp } from '../../ducks/auth'

class AuthPage extends React.Component {
    handleSignIn = ({ email, password }) => {
        this.props.signIn(email, password)
    }

    handleSignUp = ({ email, password }) => {
        this.props.signUp(email, password)
    }

    render() {
        return (
            <div>
                <h1>Auth Page</h1>
                <Route path="/auth/sign-in" render={() => <SignInForm onSubmit={this.handleSignIn}/>} />
                <Route path="/auth/sign-up" render={() => <SignUpForm onSubmit={this.handleSignUp}/>} />
            </div>
        )
    }
}

export default connect(null, {
    signIn,
    signUp,
})(AuthPage)