import React from 'react'
import { connect } from 'react-redux'
import SelectedEventCard from './selected-event-card'
import { selectedEventsSelector } from '../../ducks/events'

class SelectedEvents extends React.Component {
  render() {
    return (
      <div>
        {this.props.events.map((event) => (
          <SelectedEventCard key={event.id} event={event} />
        ))}
      </div>
    )
  }
}

export default connect((state) => ({
  events: selectedEventsSelector(state)
}))(SelectedEvents)
