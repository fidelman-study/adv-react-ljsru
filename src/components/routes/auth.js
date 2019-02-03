import React from 'react'
import { Route } from 'react-router-dom'
import SignInForm from '../auth/sign-in-form'
import SignUpForm from '../auth/sign-up-form'

class AuthPage extends React.Component {
    handleSignIn = ({ email, password }) => {
        console.log(email, password)
    }

    handleSignUp = ({ email, password }) => {
        console.log(email, password)
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

export default AuthPage