import React from 'react'
import { connect } from 'react-redux'
import { List } from 'react-virtualized'
import { TransitionMotion, spring } from 'react-motion'
import SelectedEventCard from './selected-event-card'
import { selectedEventsSelector } from '../../ducks/events'

class SelectedEvents extends React.Component {
  get styles() {
    return this.props.events.map((event) => ({
      key: event.id,
      style: {
        opacity: spring(1, { stiffness: 100, damping: 40 })
      },
      data: event
    }))
  }

  rowRenderer = (interpolated) => ({ index, key, style }) => {
    const rowCtx = interpolated[index]
    return (
      <div key={rowCtx.key} style={{ ...style, ...rowCtx.style }}>
        <SelectedEventCard event={rowCtx.data} />
      </div>
    )
  }

  setListRef = (ref) => (this.list = ref)

  willEnter = () => ({ opacity: 0 })

  willLeave = () => ({ opacity: spring(0, { stiffness: 100, damping: 40 }) })

  render() {
    return (
      <TransitionMotion
        styles={this.styles}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
      >
        {(interpolated) => (
          <List
            rowCount={interpolated.length}
            width={500}
            height={400}
            rowHeight={150}
            rowRenderer={this.rowRenderer(interpolated)}
          />
        )}
      </TransitionMotion>
    )
  }
}

export default connect((state) => ({
  events: selectedEventsSelector(state)
}))(SelectedEvents)
