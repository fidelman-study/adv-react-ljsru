import React from 'react'

class ErrorField extends React.Component {
  render() {
    const {
      input,
      label,
      meta: { error, touched },
      ...rest
    } = this.props
    const errorText = error && touched && <h4>{error}</h4>
    return (
      <div>
        {label}
        <input {...input} {...rest} />
        {errorText}
      </div>
    )
  }
}

export default ErrorField
