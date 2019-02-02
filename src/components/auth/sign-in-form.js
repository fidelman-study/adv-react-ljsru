import React from 'react'
import { reduxForm, Field } from 'redux-form'

class SignInForm extends React.Component {
    render() {
        const { handleSubmit } = this.props

        return (
            <div>
                <h3>Sign In</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        Email:
                        <Field name="email" component="input" />
                    </div>
                    <div>
                        Password:
                        <Field name="password" component="input" type="password" />
                    </div>
                    <button>
                        Sign In
                    </button>
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: 'auth',
})(SignInForm)