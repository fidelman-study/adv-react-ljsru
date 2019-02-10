import React, { Component } from 'react'
import { Text, ScrollView } from 'react-native'

export default class EventList extends Component {
  render() {
    return (
      <ScrollView>
        {this.props.eventList.map(event => (
          <Text key={event.id}>{event.title}</Text>
        ))}
      </ScrollView>
    )
  }
}
