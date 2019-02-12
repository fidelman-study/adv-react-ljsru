import React, { Component } from 'react'
import PersonPhoto from '../people/person-photo'

export default class PersonPhotoScreen extends Component {
  render() {
    return <PersonPhoto id={this.props.navigation.state.params.id}/>
  }
}
