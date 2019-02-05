import React from 'react'
import { connect } from 'react-redux'
import { List } from 'react-virtualized'
import SelectedEventCard from './selected-event-card'
import { selectedEventsSelector } from '../../ducks/events'

class SelectedEvents extends React.Component {
  rowRenderer = ({ index, key, style }) => (
    <div key={key} style={style}>
      <SelectedEventCard event={this.props.events[index]} />
    </div>
  )

  render() {
    return (
      <List
        width={400}
        height={300}
        rowCount={this.props.events.length}
        rowHeight={150}
        rowRenderer={this.rowRenderer}
      />
    )
  }
}

export default connect((state) => ({
  events: selectedEventsSelector(state)
}))(SelectedEvents)
