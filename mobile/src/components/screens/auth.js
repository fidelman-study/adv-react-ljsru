import React, { Component } from 'react'
import Auth from '../auth'

export default class AuthScreen extends Component {
  render() {
    return <Auth onSubmit={this.handleSubmit} />
  }

  handleSubmit = () => {
    this.props.navigation.navigate('lists')
  }
}
