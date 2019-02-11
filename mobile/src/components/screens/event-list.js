import React, { Component } from 'react'
import EventList from '../events/event-list';
import { events } from '../../../fixtures'

const eventList = Object.entries(events).map(([id, event]) => ({ id, ...event }))

export default class EventListScreen extends Component {
  render() {
    return <EventList events={eventList} onEventPress={this.handleEventPress} />
  }

  handleEventPress = event => {
    this.props.navigation.navigate('event', { id: event.id })
  }
}
