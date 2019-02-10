import React from 'react'
import { Text } from 'react-native'
import Card from '../common/card'

class EventCard extends React.Component {
  render() {
    const { event } = this.props
    return (
      <Card>
        <Text>{event.title}</Text>
      </Card>
    )
  }
}

export default EventCard