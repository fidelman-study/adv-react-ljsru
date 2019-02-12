import React from 'react'
import Photo from '../common/photo'
import {inject} from 'mobx-react'

@inject('people')
export default class PersonPhoto extends React.Component {
  render() {
    return <Photo getPhoto={this.getPhoto} />
  }

  getPhoto = ({uri}) => {
    const { id, people } = this.props
    people.takePhoto(id, uri)
  }
}