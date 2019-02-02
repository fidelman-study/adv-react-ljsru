import React from 'react'
import SignInForm from '../auth/sign-in-form'

class AuthPage extends React.Component {
    handleSignIn = ({ email, password }) => {
        console.log(email, password)
    }

    render() {
        return (
            <div>
                <h1>Auth Page</h1>
                <SignInForm onSubmit={this.handleSignIn}/>
            </div>
        )
    }
}

export default AuthPage