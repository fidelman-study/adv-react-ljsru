import React from 'react'
import { Text } from 'react-native'
import {observer} from 'mobx-react'
import Card from '../common/card'

@observer // wrap everything to observer
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