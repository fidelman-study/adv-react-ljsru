import React from 'react'
import { reduxForm, Field } from 'redux-form'
import emailValidator from 'email-validator'
import ErrorField from '../common/error-field'

class NewAddPersonForm extends React.Component {
  render() {
    const { handleSubmit } = this.props

    return (
      <div>
        <h3>Add a Person</h3>
        <form onSubmit={handleSubmit}>
          <Field label="Email:" name="email" component={ErrorField} />
          <Field label="First Name:" name="firstName" component={ErrorField} />
          <Field label="Last Name:" name="lastName" component={ErrorField} />
          <button>Add a Person</button>
        </form>
      </div>
    )
  }
}

const validate = ({ email, firstName, lastName }) => {
  const errors = {}

  if (!email) errors.email = 'Email is required field'
  else if (!emailValidator.validate(email)) errors.email = 'incorrect email'

  if (!firstName) errors.firstName = 'First Name is required'

  if (!lastName) errors.lastName = 'Last Name is required'

  return errors
}

export default reduxForm({
  form: 'person',
  validate
})(NewAddPersonForm)
