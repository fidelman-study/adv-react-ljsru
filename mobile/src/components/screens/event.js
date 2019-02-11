import React, { Component } from 'react'
import Event from '../events/event'
import { events } from '../../../fixtures'

export default class EventScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: events[navigation.state.params.id].title,
  })

  render() {
    return <Event event={events[this.props.navigation.state.params.id]} />
  }
}
